'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, CircleCheckBig, LoaderCircle, Sparkles, UserRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { ContactSchema } from '@/lib/validations';
import type { ContactPayload } from '@/types';
import { Button } from '@/components/ui/Button';

type StatusTone = 'loading' | 'success' | 'error';

interface SubmissionStatus {
  message: string;
  tone: StatusTone;
}

const fieldBase =
  'w-full border border-[var(--color-bg-secondary)] bg-white px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-soft-gray)] transition-all duration-300 focus:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/20';

const easeCurve: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeCurve } },
};

type PlanId = 'core' | 'boost' | 'prime' | 'premium';

const planPrefill: Record<PlanId, Pick<ContactPayload, 'services' | 'budgetRange' | 'message'>> = {
  core: {
    services: ['Social Media Mastery'],
    budgetRange: '<25k',
    message:
      'I want to start with the CORE monthly growth partnership. Please share onboarding steps, expected deliverables, and monthly workflow.',
  },
  boost: {
    services: ['Social Media Mastery', 'Growth and Promotion'],
    budgetRange: '25k-1L',
    message:
      'I am interested in the BOOST monthly growth partnership. Please share timelines, reel workflow, and ad-management process.',
  },
  prime: {
    services: ['Social Media Mastery', 'Web and Domain Management', 'Growth and Promotion'],
    budgetRange: '25k-1L',
    message:
      'I would like the PRIME monthly growth partnership. Please share kickoff requirements and weekly KPI reporting structure.',
  },
  premium: {
    services: ['Social Media Mastery', 'Web and Domain Management', 'Growth and Promotion'],
    budgetRange: '1L-5L',
    message:
      'I am interested in the PREMIUM monthly growth partnership. Please prepare a custom execution plan with channel coverage and strategy cadence.',
  },
};

export function ContactForm() {
  const [status, setStatus] = useState<SubmissionStatus | null>(null);
  const hasAppliedPlanPrefill = useRef(false);
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayload>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      type: 'business',
      services: [],
      budgetRange: '' as never,
      honeypot: '',
    },
  });

  const type = watch('type');

  const serviceOptions = useMemo(
    () => ['Social Media Mastery', 'Web and Domain Management', 'Growth and Promotion'],
    [],
  );

  useEffect(() => {
    if (hasAppliedPlanPrefill.current) {
      return;
    }

    const selected = searchParams.get('plan')?.toLowerCase();
    if (!selected || !['core', 'boost', 'prime', 'premium'].includes(selected)) {
      return;
    }

    const selectedPlan = selected as PlanId;
    const prefill = planPrefill[selectedPlan];
    const existingMessage = getValues('message');

    setValue('type', 'business');
    setValue('services', prefill.services);
    setValue('budgetRange', prefill.budgetRange);
    setValue('message', existingMessage && existingMessage.trim().length > 0 ? existingMessage : prefill.message);
    hasAppliedPlanPrefill.current = true;
  }, [getValues, searchParams, setValue]);

  const onInvalid = () => {
    setStatus({
      message: 'Please fix the highlighted fields and try again.',
      tone: 'error',
    });
  };

  const onSubmit = async (payload: ContactPayload) => {
    try {
      setStatus({ message: 'Submitting your growth brief...', tone: 'loading' });

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

      if (!response.ok) {
        setStatus({
          message: data.error ?? 'Something went wrong. Please try again.',
          tone: 'error',
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
        budgetRange: '' as never,
        message: '',
      });
      setStatus({
        message: data.message ?? "We'll be in touch within 24 hours.",
        tone: 'success',
      });
    } catch {
      setStatus({
        message: 'Unable to submit right now. Please try again in a moment.',
        tone: 'error',
      });
    }
  };

  return (
    <motion.form
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className="space-y-8"
      noValidate
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      <input
        type="text"
        {...register('honeypot')}
        className="absolute left-[-9999px] top-auto h-0 w-0 opacity-0"
        tabIndex={-1}
        autoComplete="new-password"
        aria-hidden="true"
      />

      <motion.div variants={reveal} className="rounded-sm border border-[var(--color-bg-secondary)] bg-white/70 p-5">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">01 Audience</p>
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text)]">Who are you?</legend>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="group flex cursor-pointer items-center gap-3 border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] px-4 py-4 transition-all duration-300 hover:border-[var(--color-accent)]">
              <input type="radio" value="business" {...register('type')} className="h-4 w-4 accent-[var(--color-accent)]" />
              <Building2 className="h-4 w-4 text-[var(--color-accent)]" />
              <span className="text-sm font-medium text-[var(--color-text)]">I am a Business</span>
            </label>
            <label className="group flex cursor-pointer items-center gap-3 border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] px-4 py-4 transition-all duration-300 hover:border-[var(--color-accent)]">
              <input type="radio" value="individual" {...register('type')} className="h-4 w-4 accent-[var(--color-accent)]" />
              <UserRound className="h-4 w-4 text-[var(--color-accent)]" />
              <span className="text-sm font-medium text-[var(--color-text)]">I am an Individual</span>
            </label>
          </div>
        </fieldset>
      </motion.div>

      <motion.div variants={reveal} className="rounded-sm border border-[var(--color-bg-secondary)] bg-white/70 p-5">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">02 Contact Details</p>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
              Full Name
            </label>
            <input id="name" className={fieldBase} placeholder="Your full name" {...register('name')} />
            {errors.name ? <p className="mt-2 text-sm text-red-600">{errors.name.message}</p> : null}
          </div>

          <AnimatePresence initial={false}>
            {type === 'business' ? (
              <motion.div
                key="company"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: easeCurve }}
                className="md:col-span-2"
              >
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
                  Company Name
                </label>
                <input id="company" className={fieldBase} placeholder="Your business name" {...register('company')} />
                {errors.company ? <p className="mt-2 text-sm text-red-600">{errors.company.message}</p> : null}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
              Work Email
            </label>
            <input id="email" type="email" className={fieldBase} placeholder="name@company.com" {...register('email')} />
            {errors.email ? <p className="mt-2 text-sm text-red-600">{errors.email.message}</p> : null}
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
              Phone Number
            </label>
            <input id="phone" type="tel" className={fieldBase} placeholder="+91 9XXXXXXXXX" {...register('phone')} />
            {errors.phone ? <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p> : null}
          </div>
        </div>
      </motion.div>

      <motion.div variants={reveal} className="rounded-sm border border-[var(--color-bg-secondary)] bg-white/70 p-5">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">03 Requirements</p>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text)]">Service Interests</legend>
          <p className="mt-2 text-sm text-[var(--color-soft-gray)]">Select all services you want to prioritize in this growth cycle.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {serviceOptions.map((service) => (
              <label
                key={service}
                className="flex cursor-pointer items-start gap-3 border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] px-4 py-3 text-sm transition-all duration-300 hover:border-[var(--color-accent)]"
              >
                <input type="checkbox" value={service} {...register('services')} className="mt-1 h-4 w-4 accent-[var(--color-accent)]" />
                <span className="text-[var(--color-text)]">{service}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="budgetRange" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
              Budget Range
            </label>
            <select id="budgetRange" className={fieldBase} {...register('budgetRange')}>
              <option value="">Select Budget Range</option>
              <option value="<25k">Below 25k</option>
              <option value="25k-1L">25k to 1L</option>
              <option value="1L-5L">1L to 5L</option>
              <option value="5L+">5L+</option>
            </select>
          </div>

          <div className="rounded-sm border border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] p-4">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)]">Response Promise</p>
            <p className="mt-2 text-sm text-[var(--color-soft-gray)]">
              You will get a personalized response in less than 24 hours with a practical growth direction.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--color-text)]">
            Project Brief
          </label>
          <textarea
            id="message"
            className={`${fieldBase} min-h-40 resize-y`}
            placeholder="Tell us your goals, launch timeline, and where you feel stuck right now."
            {...register('message')}
          />
          {errors.message ? <p className="mt-2 text-sm text-red-600">{errors.message.message}</p> : null}
        </div>
      </motion.div>

      <motion.div variants={reveal} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[var(--color-soft-gray)]">
          <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
          Strategic planning, creative execution, measurable outcomes.
        </div>
        <Button type="submit" className="w-full gap-2 md:w-auto" onClick={() => undefined}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {status ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: easeCurve }}
            className={`flex items-start gap-3 border px-4 py-3 text-sm ${
              status.tone === 'success'
                ? 'border-green-300 bg-green-50 text-green-800'
                : status.tone === 'error'
                  ? 'border-red-300 bg-red-50 text-red-700'
                  : 'border-[var(--color-bg-secondary)] bg-[var(--color-bg-light)] text-[var(--color-text)]'
            }`}
          >
            {status.tone === 'loading' ? (
              <LoaderCircle className="mt-0.5 h-4 w-4 animate-spin" />
            ) : (
              <CircleCheckBig className="mt-0.5 h-4 w-4" />
            )}
            <p>{status.message}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.form>
  );
}
