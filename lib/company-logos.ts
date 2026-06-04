import 'server-only';

import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import type { CompanyLogo } from '@/types';

const LOGO_DIRECTORY = path.join(process.cwd(), 'public', 'company-logos');
const MANIFEST_FILE = path.join(LOGO_DIRECTORY, 'logos.json');

const MIME_EXTENSION_MAP: Record<string, string> = {
	'image/png': 'png',
	'image/jpeg': 'jpg',
	'image/webp': 'webp',
	'image/svg+xml': 'svg',
};

const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024;

function normalizeHref(input: string | null | undefined): string | null {
	const value = input?.trim();

	if (!value) {
		return null;
	}

	if (value.startsWith('/')) {
		return value;
	}

	if (/^https?:\/\//i.test(value)) {
		return value;
	}

	return null;
}

function normalizeAlt(input: string | null | undefined): string {
	const value = input?.trim();
	if (!value) {
		return 'Client logo';
	}

	return value.slice(0, 100);
}

function sortByOrder(logos: CompanyLogo[]): CompanyLogo[] {
	return [...logos].sort((a, b) => a.order - b.order);
}

async function ensureStorage(): Promise<void> {
	await fs.mkdir(LOGO_DIRECTORY, { recursive: true });

	try {
		await fs.access(MANIFEST_FILE);
	} catch {
		await fs.writeFile(MANIFEST_FILE, '[]\n', 'utf8');
	}
}

async function readManifest(): Promise<CompanyLogo[]> {
	await ensureStorage();

	const raw = await fs.readFile(MANIFEST_FILE, 'utf8');
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) {
			return [];
		}

		return sortByOrder(
			parsed
				.filter((item) => item && typeof item === 'object')
				.map((item) => ({
					id: String(item.id ?? ''),
					src: String(item.src ?? ''),
					alt: normalizeAlt(typeof item.alt === 'string' ? item.alt : undefined),
					href: normalizeHref(typeof item.href === 'string' ? item.href : undefined),
					order: Number.isFinite(item.order) ? Number(item.order) : 0,
					createdAt: String(item.createdAt ?? new Date().toISOString()),
					updatedAt: String(item.updatedAt ?? new Date().toISOString()),
				}))
				.filter((item) => item.id && item.src),
		);
	} catch {
		return [];
	}
}

async function writeManifest(logos: CompanyLogo[]): Promise<CompanyLogo[]> {
	const normalized = sortByOrder(logos).map((logo, index) => ({
		...logo,
		order: index,
	}));

	await fs.writeFile(MANIFEST_FILE, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
	return normalized;
}

function getFileExtension(file: File): string {
	const byMime = MIME_EXTENSION_MAP[file.type];
	if (byMime) {
		return byMime;
	}

	const ext = path.extname(file.name || '').replace('.', '').toLowerCase();
	if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) {
		return ext === 'jpeg' ? 'jpg' : ext;
	}

	throw new Error('Unsupported logo format. Use PNG, JPG, WEBP, or SVG.');
}

async function writeLogoFile(file: File, baseName: string): Promise<string> {
	if (file.size > MAX_FILE_SIZE_BYTES) {
		throw new Error('Logo is too large. Max size is 3MB.');
	}

	const extension = getFileExtension(file);
	const fileName = `${baseName}.${extension}`;
	const targetPath = path.join(LOGO_DIRECTORY, fileName);

	const buffer = Buffer.from(await file.arrayBuffer());
	await fs.writeFile(targetPath, buffer);

	return `/company-logos/${fileName}`;
}

async function deleteLogoFile(src: string): Promise<void> {
	if (!src.startsWith('/company-logos/')) {
		return;
	}

	const relative = src.replace('/company-logos/', '');
	const target = path.join(LOGO_DIRECTORY, relative);

	try {
		await fs.unlink(target);
	} catch {
		// No-op: deleting metadata should not fail if file is already missing.
	}
}

export async function listCompanyLogos(): Promise<CompanyLogo[]> {
	return readManifest();
}

export async function createCompanyLogo(params: {
	file: File;
	alt?: string | null;
	href?: string | null;
}): Promise<CompanyLogo[]> {
	const logos = await readManifest();
	const id = randomUUID().replace(/-/g, '').slice(0, 16);
	const now = new Date().toISOString();

	const src = await writeLogoFile(params.file, id);

	logos.push({
		id,
		src,
		alt: normalizeAlt(params.alt),
		href: normalizeHref(params.href),
		order: logos.length,
		createdAt: now,
		updatedAt: now,
	});

	return writeManifest(logos);
}

export async function updateCompanyLogo(
	id: string,
	params: {
		alt?: string | null;
		href?: string | null;
		file?: File | null;
	},
): Promise<CompanyLogo[]> {
	const logos = await readManifest();
	const index = logos.findIndex((logo) => logo.id === id);

	if (index === -1) {
		throw new Error('Logo not found.');
	}

	const current = logos[index];
	let src = current.src;

	if (params.file) {
		src = await writeLogoFile(params.file, id);
		if (current.src !== src) {
			await deleteLogoFile(current.src);
		}
	}

	logos[index] = {
		...current,
		src,
		alt: params.alt === undefined ? current.alt : normalizeAlt(params.alt),
		href: params.href === undefined ? current.href : normalizeHref(params.href),
		updatedAt: new Date().toISOString(),
	};

	return writeManifest(logos);
}

export async function deleteCompanyLogo(id: string): Promise<CompanyLogo[]> {
	const logos = await readManifest();
	const item = logos.find((logo) => logo.id === id);

	if (!item) {
		throw new Error('Logo not found.');
	}

	await deleteLogoFile(item.src);
	const next = logos.filter((logo) => logo.id !== id);
	return writeManifest(next);
}

export async function reorderCompanyLogos(orderedIds: string[]): Promise<CompanyLogo[]> {
	const logos = await readManifest();

	if (orderedIds.length !== logos.length) {
		throw new Error('Logo order payload is invalid.');
	}

	const map = new Map(logos.map((logo) => [logo.id, logo]));
	const reordered: CompanyLogo[] = [];

	for (const id of orderedIds) {
		const logo = map.get(id);
		if (!logo) {
			throw new Error('Logo order payload references unknown logo.');
		}

		reordered.push({
			...logo,
			updatedAt: new Date().toISOString(),
		});
	}

	return writeManifest(reordered);
}
