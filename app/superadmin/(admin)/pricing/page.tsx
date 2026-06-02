'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, RefreshCw, Save, Settings2 } from 'lucide-react';
import type {
  PricingAudience,
  PricingAudienceContent,
  PricingConfig,
  PricingMonthlyPlan,
  PricingProjectService,
  PricingServiceCategory,
} from '@/types';
import { DEFAULT_PRICING_CONFIG } from '@/lib/pricing-config';

function deepCloneConfig(config: PricingConfig): PricingConfig {
  return {
    india: {
      monthlyPlans: config.india.monthlyPlans.map((plan) => ({ ...plan, highlights: [...plan.highlights] })),
      serviceCategories: config.india.serviceCategories.map((category) => ({
        ...category,
        services: category.services.map((service) => ({ ...service, deliverables: [...service.deliverables] })),
      })),
      notes: { ...config.india.notes },
    },
    international: {
      monthlyPlans: config.international.monthlyPlans.map((plan) => ({ ...plan, highlights: [...plan.highlights] })),
      serviceCategories: config.international.serviceCategories.map((category) => ({
        ...category,
        services: category.services.map((service) => ({ ...service, deliverables: [...service.deliverables] })),
      })),
      notes: { ...config.international.notes },
    },
    updatedAt: config.updatedAt ?? null,
    updatedBy: config.updatedBy ?? null,
  };
}

function textToList(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function listToText(items: string[]): string {
  return items.join('\n');
}

export default function PricingAdminPage() {
  const [audience, setAudience] = useState<PricingAudience>('india');
  const [config, setConfig] = useState<PricingConfig>(deepCloneConfig(DEFAULT_PRICING_CONFIG));
  const [baseline, setBaseline] = useState<PricingConfig>(deepCloneConfig(DEFAULT_PRICING_CONFIG));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isDirty = useMemo(() => JSON.stringify(config) !== JSON.stringify(baseline), [config, baseline]);

  const activeContent: PricingAudienceContent = config[audience];

  const fetchConfig = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/pricing');
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to load pricing config.');
        return;
      }

      const nextConfig: PricingConfig = data.config ?? DEFAULT_PRICING_CONFIG;
      setConfig(deepCloneConfig(nextConfig));
      setBaseline(deepCloneConfig(nextConfig));
    } catch (err) {
      console.error(err);
      setError('Failed to load pricing config.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const updateAudienceContent = (updater: (content: PricingAudienceContent) => PricingAudienceContent) => {
    setConfig((prev) => ({
      ...prev,
      [audience]: updater(prev[audience]),
    }));
  };

  const updatePlan = (planId: string, updater: (plan: PricingMonthlyPlan) => PricingMonthlyPlan) => {
    updateAudienceContent((content) => ({
      ...content,
      monthlyPlans: content.monthlyPlans.map((plan) => (plan.id === planId ? updater(plan) : plan)),
    }));
  };

  const updateCategory = (categoryId: string, updater: (category: PricingServiceCategory) => PricingServiceCategory) => {
    updateAudienceContent((content) => ({
      ...content,
      serviceCategories: content.serviceCategories.map((category) =>
        category.id === categoryId ? updater(category) : category,
      ),
    }));
  };

  const updateService = (
    categoryId: string,
    serviceId: string,
    updater: (service: PricingProjectService) => PricingProjectService,
  ) => {
    updateCategory(categoryId, (category) => ({
      ...category,
      services: category.services.map((service) => (service.id === serviceId ? updater(service) : service)),
    }));
  };

  const saveConfig = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to save pricing config.');
        return;
      }

      const saved: PricingConfig = data.config ?? config;
      setConfig(deepCloneConfig(saved));
      setBaseline(deepCloneConfig(saved));
      setSuccess('Pricing content saved successfully.');
    } catch (err) {
      console.error(err);
      setError('Failed to save pricing config.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <h2 className="text-white text-sm font-semibold">Pricing Editor</h2>
            <p className="text-xs text-gray-500 mt-1">
              Manage separate plan pricing and service content for India and International audiences.
            </p>
            <p className="text-[11px] text-gray-600 mt-1">
              Last saved:{' '}
              {config.updatedAt ? new Date(config.updatedAt).toLocaleString('en-IN') : 'Not saved yet'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex bg-[#111111] border border-white/10 rounded-lg p-1">
              {(['india', 'international'] as PricingAudience[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAudience(value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
                    audience === value
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {value === 'india' ? 'India (INR)' : 'International (USD)'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={fetchConfig}
              className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-lg transition-colors"
            >
              <RefreshCw size={14} />
              Reload
            </button>

            <button
              type="button"
              onClick={saveConfig}
              disabled={saving || !isDirty}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <Save size={14} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {error ? (
          <div className="mt-4 flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        {success ? (
          <div className="mt-4 flex items-center gap-2 px-3 py-2.5 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg">
            <Settings2 size={14} className="shrink-0" />
            <span>{success}</span>
          </div>
        ) : null}
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-5">
        <h3 className="text-white text-sm font-semibold">Monthly Plans ({audience === 'india' ? 'INR' : 'USD'})</h3>
        <div className="grid gap-4">
          {activeContent.monthlyPlans.map((plan) => (
            <div key={plan.id} className="border border-white/10 bg-[#111111] rounded-xl p-4 space-y-3">
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Plan Name</label>
                  <input
                    value={plan.name}
                    onChange={(e) => updatePlan(plan.id, (current) => ({ ...current, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Price Text</label>
                  <input
                    value={plan.price}
                    onChange={(e) => updatePlan(plan.id, (current) => ({ ...current, price: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
                  />
                </div>
                <label className="flex items-center gap-2 mt-5 text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={Boolean(plan.mostPopular)}
                    onChange={(e) =>
                      updatePlan(plan.id, (current) => ({
                        ...current,
                        mostPopular: e.target.checked,
                      }))
                    }
                    className="h-4 w-4"
                  />
                  Mark as most popular
                </label>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Tagline</label>
                <input
                  value={plan.tagline}
                  onChange={(e) => updatePlan(plan.id, (current) => ({ ...current, tagline: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Highlights (one line per point)</label>
                <textarea
                  value={listToText(plan.highlights)}
                  onChange={(e) =>
                    updatePlan(plan.id, (current) => ({
                      ...current,
                      highlights: textToList(e.target.value),
                    }))
                  }
                  rows={5}
                  className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white resize-y"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-5">
        <h3 className="text-white text-sm font-semibold">Service Categories ({audience === 'india' ? 'INR' : 'USD'})</h3>
        <div className="space-y-5">
          {activeContent.serviceCategories.map((category) => (
            <div key={category.id} className="border border-white/10 bg-[#111111] rounded-xl p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category Label</label>
                  <input
                    value={category.label}
                    onChange={(e) => updateCategory(category.id, (current) => ({ ...current, label: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category Subtitle</label>
                  <input
                    value={category.subtitle}
                    onChange={(e) =>
                      updateCategory(category.id, (current) => ({ ...current, subtitle: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {category.services.map((service) => (
                  <div key={service.id} className="border border-white/10 rounded-lg p-3 space-y-2">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Service Title</label>
                        <input
                          value={service.title}
                          onChange={(e) =>
                            updateService(category.id, service.id, (current) => ({
                              ...current,
                              title: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Service Price Text</label>
                        <input
                          value={service.price}
                          onChange={(e) =>
                            updateService(category.id, service.id, (current) => ({
                              ...current,
                              price: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Deliverables (one line per point)</label>
                      <textarea
                        value={listToText(service.deliverables)}
                        onChange={(e) =>
                          updateService(category.id, service.id, (current) => ({
                            ...current,
                            deliverables: textToList(e.target.value),
                          }))
                        }
                        rows={4}
                        className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white resize-y"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-4">
        <h3 className="text-white text-sm font-semibold">Global Notes ({audience === 'india' ? 'INR' : 'USD'})</h3>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Upgrade Note</label>
          <textarea
            value={activeContent.notes.upgradeNote}
            onChange={(e) =>
              updateAudienceContent((content) => ({
                ...content,
                notes: { ...content.notes, upgradeNote: e.target.value },
              }))
            }
            rows={3}
            className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white resize-y"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Ad Spend Note</label>
          <textarea
            value={activeContent.notes.adSpendNote}
            onChange={(e) =>
              updateAudienceContent((content) => ({
                ...content,
                notes: { ...content.notes, adSpendNote: e.target.value },
              }))
            }
            rows={3}
            className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white resize-y"
          />
        </div>
      </div>
    </div>
  );
}
