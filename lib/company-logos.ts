import 'server-only';

import { randomUUID } from 'crypto';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import type { CompanyLogo } from '@/types';

const LOGOS_COLLECTION = 'company_logos';
const MAX_FILE_SIZE_BYTES = 32 * 1024 * 1024;
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

interface CompanyLogoDoc {
	src: string;
	alt: string;
	href: string | null;
	order: number;
	deleteUrl?: string | null;
	createdAt?: Timestamp | string | Date | null;
	updatedAt?: Timestamp | string | Date | null;
}

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

function toIsoString(value: Timestamp | string | Date | null | undefined): string {
	if (value instanceof Timestamp) {
		return value.toDate().toISOString();
	}

	if (value instanceof Date) {
		return value.toISOString();
	}

	if (typeof value === 'string' && value.trim()) {
		return value;
	}

	return new Date().toISOString();
}

function mapDocToLogo(id: string, raw: CompanyLogoDoc): CompanyLogo {
	return {
		id,
		src: String(raw.src ?? ''),
		alt: normalizeAlt(raw.alt),
		href: normalizeHref(raw.href),
		order: Number.isFinite(raw.order) ? Number(raw.order) : 0,
		createdAt: toIsoString(raw.createdAt),
		updatedAt: toIsoString(raw.updatedAt),
	};
}

async function uploadToImgBB(file: File, imageName: string): Promise<{ src: string; deleteUrl: string | null }> {
	const apiKey = process.env.IMGBB_API_KEY?.trim();
	if (!apiKey) {
		throw new Error('IMGBB_API_KEY is missing on the server.');
	}

	if (file.size > MAX_FILE_SIZE_BYTES) {
		throw new Error('Logo is too large. Max size is 32MB.');
	}

	if (file.type && !file.type.startsWith('image/')) {
		throw new Error('Unsupported logo format. Use an image file.');
	}

	const imageBase64 = Buffer.from(await file.arrayBuffer()).toString('base64');
	const body = new URLSearchParams();
	body.set('key', apiKey);
	body.set('image', imageBase64);
	body.set('name', imageName);

	const response = await fetch(IMGBB_UPLOAD_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: body.toString(),
	});

	let payload: unknown = null;
	try {
		payload = await response.json();
	} catch {
		throw new Error('ImgBB returned an invalid response.');
	}

	const data = payload && typeof payload === 'object' && 'data' in payload ? (payload as { data?: unknown }).data : null;
	const src = data && typeof data === 'object' && 'url' in data ? (data as { url?: unknown }).url : null;
	const deleteUrl =
		data && typeof data === 'object' && 'delete_url' in data
			? (data as { delete_url?: unknown }).delete_url
			: null;

	if (!response.ok || typeof src !== 'string' || !src.trim()) {
		throw new Error('Failed to upload logo to ImgBB.');
	}

	return {
		src,
		deleteUrl: typeof deleteUrl === 'string' && deleteUrl.trim() ? deleteUrl : null,
	};
}

async function deleteFromImgBB(deleteUrl: string | null | undefined): Promise<void> {
	if (!deleteUrl) {
		return;
	}

	try {
		await fetch(deleteUrl, { method: 'GET' });
	} catch {
		// No-op: metadata delete should still succeed even if ImgBB cleanup fails.
	}
}

export async function listCompanyLogos(): Promise<CompanyLogo[]> {
	const db = getFirebaseAdminDb();
	const snapshot = await db.collection(LOGOS_COLLECTION).orderBy('order', 'asc').get();

	return snapshot.docs
		.map((doc) => mapDocToLogo(doc.id, doc.data() as CompanyLogoDoc))
		.filter((logo) => logo.src);
}

export async function createCompanyLogo(params: {
	file: File;
	alt?: string | null;
	href?: string | null;
}): Promise<CompanyLogo[]> {
	const db = getFirebaseAdminDb();
	const existingCount = (await db.collection(LOGOS_COLLECTION).count().get()).data().count;
	const id = randomUUID().replace(/-/g, '').slice(0, 16);
	const upload = await uploadToImgBB(params.file, id);

	await db.collection(LOGOS_COLLECTION).doc(id).set({
		src: upload.src,
		deleteUrl: upload.deleteUrl,
		alt: normalizeAlt(params.alt),
		href: normalizeHref(params.href),
		order: existingCount,
		createdAt: FieldValue.serverTimestamp(),
		updatedAt: FieldValue.serverTimestamp(),
	});

	return listCompanyLogos();
}

export async function updateCompanyLogo(
	id: string,
	params: {
		alt?: string | null;
		href?: string | null;
		file?: File | null;
	},
): Promise<CompanyLogo[]> {
	const db = getFirebaseAdminDb();
	const docRef = db.collection(LOGOS_COLLECTION).doc(id);
	const snapshot = await docRef.get();
	if (!snapshot.exists) {
		throw new Error('Logo not found.');
	}

	const current = snapshot.data() as CompanyLogoDoc;
	let nextSrc = current.src;
	let nextDeleteUrl = current.deleteUrl ?? null;

	if (params.file) {
		const uploaded = await uploadToImgBB(params.file, id);
		nextSrc = uploaded.src;
		nextDeleteUrl = uploaded.deleteUrl;
	}

	await docRef.set(
		{
			src: nextSrc,
			deleteUrl: nextDeleteUrl,
			alt: params.alt === undefined ? normalizeAlt(current.alt) : normalizeAlt(params.alt),
			href: params.href === undefined ? normalizeHref(current.href) : normalizeHref(params.href),
			updatedAt: FieldValue.serverTimestamp(),
		},
		{ merge: true },
	);

	if (params.file && current.deleteUrl && current.deleteUrl !== nextDeleteUrl) {
		await deleteFromImgBB(current.deleteUrl);
	}

	return listCompanyLogos();
}

export async function deleteCompanyLogo(id: string): Promise<CompanyLogo[]> {
	const db = getFirebaseAdminDb();
	const docRef = db.collection(LOGOS_COLLECTION).doc(id);
	const snapshot = await docRef.get();
	if (!snapshot.exists) {
		throw new Error('Logo not found.');
	}

	const item = snapshot.data() as CompanyLogoDoc;
	await docRef.delete();
	await deleteFromImgBB(item.deleteUrl ?? null);

	const remaining = await db.collection(LOGOS_COLLECTION).orderBy('order', 'asc').get();
	const batch = db.batch();
	remaining.docs.forEach((doc, index) => {
		batch.update(doc.ref, {
			order: index,
			updatedAt: FieldValue.serverTimestamp(),
		});
	});
	await batch.commit();

	return listCompanyLogos();
}

export async function reorderCompanyLogos(orderedIds: string[]): Promise<CompanyLogo[]> {
	const db = getFirebaseAdminDb();
	const logos = await listCompanyLogos();

	if (orderedIds.length !== logos.length) {
		throw new Error('Logo order payload is invalid.');
	}

	const idSet = new Set(logos.map((logo) => logo.id));
	for (const id of orderedIds) {
		if (!idSet.has(id)) {
			throw new Error('Logo order payload references unknown logo.');
		}
	}

	const batch = db.batch();
	orderedIds.forEach((logoId, index) => {
		const ref = db.collection(LOGOS_COLLECTION).doc(logoId);
		batch.update(ref, {
			order: index,
			updatedAt: FieldValue.serverTimestamp(),
		});
});
	await batch.commit();

	return listCompanyLogos();
}
