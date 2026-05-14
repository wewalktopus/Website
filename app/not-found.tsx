'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const easing: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/');
  };

  return (
    <main className="fixed inset-0 z-100 overflow-hidden bg-(--color-bg) text-(--color-text)" aria-labelledby="not-found-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(239,77,48,0.18),transparent_42%),radial-gradient(circle_at_80%_85%,rgba(58,55,55,0.18),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(58,55,55,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(58,55,55,0.06)_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-center px-6 py-8">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="w-full max-w-3xl border border-(--color-bg-secondary) bg-(--color-bg-light)/95 p-6 shadow-[0_20px_60px_-30px_rgba(43,41,41,0.55)] backdrop-blur-sm sm:p-10"
          aria-describedby="not-found-description"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: easing }}
            className="inline-flex items-center gap-2 bg-(--color-accent) px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-white"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Route Not Found
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14, ease: easing }}
            className="mt-5 font-display text-7xl leading-none text-(--color-text-dark) sm:text-8xl"
            aria-hidden="true"
          >
            404
          </motion.p>

          <motion.h1
            id="not-found-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easing }}
            className="mt-3 font-heading text-3xl font-extrabold leading-tight text-(--color-text-dark) sm:text-4xl"
          >
            The page drifted off course.
          </motion.h1>

          <motion.p
            id="not-found-description"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: easing }}
            className="mt-4 max-w-2xl text-sm text-(--color-soft-gray) sm:text-base"
          >
            The URL you opened does not match an active Walktopus route. Head back to the homepage or return to your previous step.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.36, ease: easing }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button href="/" className="gap-2">
              <Home className="h-4 w-4" aria-hidden="true" />
              Return Home
            </Button>
            <Button variant="secondary" onClick={handleGoBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Go Back
            </Button>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}