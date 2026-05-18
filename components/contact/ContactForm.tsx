'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema } from '@/lib/validations';
import type { ContactPayload } from '@/types';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [status, setStatus] = useState<string>('');
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayload>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      type: 'business',
      services: [],
      honeypot: '',
    },
  });

  const type = watch('type');

  const serviceOptions = useMemo(
    () => ['Social Media Mastery', 'Web and Domain Management', 'Growth and Promotion'],
    [],
  );

  const onSubmit = async (payload: ContactPayload) => {
    try {
      setStatus('Submitting...');
      console.log('[contact-form] Submit started', {
        type: payload.type,
        email: payload.email,
        servicesCount: payload.services.length,
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: { error?: string; message?: string; success?: boolean; emailStatus?: string } = {};
      const contentType = response.headers.get('content-type') ?? '';
      if (contentType.includes('application/json')) {
        data = await response.json();
      }

      console.log('[contact-form] Submit response', {
        ok: response.ok,
        status: response.status,
        body: data,
      });

      if (!response.ok) {
        setStatus(data.error ?? 'Something went wrong. Please try again.');
        console.error('[contact-form] Submit failed', {
          status: response.status,
          error: data.error,
        });
        return;
      }

      reset({
        type: 'business',
        services: [],
        honeypot: '',
        name: '',
        company: '',
        email: '',
        phone: '',
        budgetRange: undefined,
        message: '',
      });
      setStatus(data.message ?? "We'll be in touch within 24 hours.");
      console.log('[contact-form] Submit success', {
        emailStatus: data.emailStatus ?? 'unknown',
      });
    } catch {
      setStatus('Unable to submit right now. Please try again in a moment.');
      console.error('[contact-form] Submit exception');
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="border border-[var(--color-bg-secondary)] p-4">
          <input type="radio" value="business" {...register('type')} /> <span className="ml-2">I am a Business</span>
        </label>
        <label className="border border-[var(--color-bg-secondary)] p-4">
          <input type="radio" value="individual" {...register('type')} /> <span className="ml-2">I am an Individual</span>
        </label>
      </div>

      <input type="text" {...register('honeypot')} className="absolute left-[-9999px] top-auto" tabIndex={-1} autoComplete="off" />

      <div>
        <input className="w-full border border-[var(--color-bg-secondary)] bg-white px-4 py-3" placeholder="Name" {...register('name')} />
        {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name.message}</p> : null}
      </div>

      {type === 'business' ? (
        <div>
          <input className="w-full border border-[var(--color-bg-secondary)] bg-white px-4 py-3" placeholder="Company" {...register('company')} />
          {errors.company ? <p className="mt-1 text-sm text-red-600">{errors.company.message}</p> : null}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <input className="w-full border border-[var(--color-bg-secondary)] bg-white px-4 py-3" placeholder="Email" {...register('email')} />
          {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email.message}</p> : null}
        </div>
        <div>
          <input className="w-full border border-[var(--color-bg-secondary)] bg-white px-4 py-3" placeholder="Phone" {...register('phone')} />
          {errors.phone ? <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p> : null}
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold uppercase tracking-[0.08em]">Service Interests</legend>
        <div className="grid gap-2 md:grid-cols-3">
          {serviceOptions.map((service) => (
            <label key={service} className="border border-[var(--color-bg-secondary)] p-3 text-sm">
              <input type="checkbox" value={service} {...register('services')} /> <span className="ml-2">{service}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <select className="w-full border border-[var(--color-bg-secondary)] bg-white px-4 py-3" {...register('budgetRange')}>
          <option value="">Select Budget Range</option>
          <option value="<25k">Below 25k</option>
          <option value="25k-1L">25k to 1L</option>
          <option value="1L-5L">1L to 5L</option>
          <option value="5L+">5L+</option>
        </select>
      </div>

      <div>
        <textarea
          className="min-h-40 w-full border border-[var(--color-bg-secondary)] bg-white px-4 py-3"
          placeholder="Tell us what growth looks like for you"
          {...register('message')}
        />
        {errors.message ? <p className="mt-1 text-sm text-red-600">{errors.message.message}</p> : null}
      </div>

      <Button type="submit" className="w-full md:w-auto" onClick={() => undefined}>
        {isSubmitting ? 'Submitting...' : 'Book a Free Consultation'}
      </Button>

      {status ? <p className="text-sm text-[var(--color-text)]">{status}</p> : null}
    </form>
  );
}
