import { CreativeRouteLoader } from '@/components/ui/CreativeRouteLoader';

export default function ServicesLoading() {
  return (
    <CreativeRouteLoader
      label="Services Engine"
      title="Calibrating your growth stack"
      hint="Loading pricing tiers, service modules, and engagement specs."
    />
  );
}
