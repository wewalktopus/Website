'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface DeferredGtmProps {
  measurementId: string;
}

export function DeferredGtm({ measurementId }: DeferredGtmProps) {
  useEffect(() => {
    let initialized = false;

    const init = () => {
      if (initialized) return;
      initialized = true;

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };

      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        send_page_view: true,
      });
    };

    const onFirstInteraction = () => init();
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'scroll', 'touchstart'];

    events.forEach((eventName) => {
      window.addEventListener(eventName, onFirstInteraction, { once: true, passive: true });
    });

    const idleId = window.setTimeout(init, 5000);

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, onFirstInteraction);
      });
      window.clearTimeout(idleId);
    };
  }, [measurementId]);

  return null;
}
