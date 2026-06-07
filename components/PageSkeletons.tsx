import { Skeleton } from './Skeleton';

export function HeroSkeleton() {
  return (
    <section className="relative pt-20 pb-12 sm:pt-44 sm:pb-20 px-4 sm:px-6 overflow-hidden border-b-2 border-brand-border bg-black">
      <div className="container max-w-7xl mx-auto relative px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 sm:gap-16 items-start">
          <div className="w-full space-y-6">
            <Skeleton className="h-5 w-64 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-16 sm:h-20 w-full max-w-lg" />
              <Skeleton className="h-16 sm:h-20 w-72" />
            </div>
            <Skeleton className="h-6 w-full max-w-md" />
            <Skeleton className="h-6 w-3/4 max-w-sm" />
            <div className="flex gap-3 sm:gap-5 pt-4">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
            <div className="grid grid-cols-2 max-w-md rounded-2xl overflow-hidden mt-6">
              <Skeleton className="h-20 rounded-none" />
              <Skeleton className="h-20 rounded-none" />
            </div>
          </div>
          <Skeleton className="aspect-[4/5] sm:aspect-square rounded-[2rem] w-full max-w-md lg:max-w-none mx-auto" />
        </div>
      </div>
    </section>
  );
}

export function StatsSkeleton() {
  return (
    <section className="py-12 sm:py-20 border-y border-brand-border/40 bg-brand-primary/50 backdrop-blur-md">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[120px] sm:h-[160px] rounded-3xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSkeleton() {
  return (
    <section className="py-16 sm:py-28 px-4 sm:px-6 overflow-hidden bg-brand-primary">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 sm:h-14 w-full max-w-lg" />
            <div className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
            </div>
          </div>
          <div className="lg:col-span-5 order-2 lg:order-2">
            <Skeleton className="h-[320px] sm:h-[480px] lg:h-[560px] w-full rounded-[2.5rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AchievementsSkeleton() {
  return (
    <section className="py-16 sm:py-28 px-4 sm:px-6 bg-brand-secondary/30 border-t border-b border-brand-border/40">
      <div className="container max-w-7xl mx-auto text-center mb-12 sm:mb-20">
        <Skeleton className="h-4 w-40 mx-auto mb-4" />
        <Skeleton className="h-10 sm:h-14 w-72 mx-auto" />
      </div>
      <div className="container max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-64 rounded-[2rem]" />
        ))}
      </div>
    </section>
  );
}

export function ScheduleSkeleton() {
  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 border-y border-brand-border bg-brand-primary">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-8 mb-6 sm:mb-16">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 sm:h-14 w-72" />
          </div>
          <Skeleton className="h-16 w-40 rounded-xl" />
        </div>
        <div className="flex gap-2 mb-6 sm:mb-10 border-b border-brand-border/40 pb-4 sm:pb-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-9 w-16 rounded-full" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-48 rounded-2xl sm:rounded-3xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSkeleton() {
  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-brand-primary border-b border-brand-border/30">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-16">
          <div className="lg:col-span-4 space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 sm:h-20 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-8 space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-0.5 h-full min-h-24 shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkillsSkeleton() {
  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-brand-secondary/20 backdrop-blur-sm border-t border-b border-brand-border">
      <div className="container max-w-7xl mx-auto text-center mb-10 sm:mb-16 space-y-3">
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-10 sm:h-14 w-64 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-12 max-w-4xl mx-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-5 w-12" />
            </div>
            <Skeleton className="h-1 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function PricingSkeleton() {
  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-brand-primary">
      <div className="container max-w-7xl mx-auto text-center mb-10 sm:mb-16 space-y-3">
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-10 sm:h-14 w-64 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-96 rounded-[2rem]" />
        ))}
      </div>
    </section>
  );
}

export function GalleryPreviewSkeleton() {
  return (
    <section className="py-16 px-4 sm:py-32 sm:px-12 lg:px-24 bg-brand-secondary/30">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
          <div className="space-y-3">
            <Skeleton className="h-12 sm:h-16 w-96" />
            <Skeleton className="h-6 w-72" />
          </div>
          <Skeleton className="h-12 w-44 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px]">
          <Skeleton className="md:col-span-2 h-[250px] md:h-full rounded-2xl sm:rounded-3xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:h-full">
            <Skeleton className="h-[180px] sm:h-[220px] md:h-full rounded-2xl sm:rounded-3xl" />
            <Skeleton className="h-[180px] sm:h-[220px] md:h-full rounded-2xl sm:rounded-3xl" />
          </div>
          <Skeleton className="h-[250px] sm:h-[350px] md:h-full rounded-2xl sm:rounded-3xl col-span-1 sm:col-span-2 md:col-span-1" />
        </div>
      </div>
    </section>
  );
}

export function ProductsSkeleton() {
  return (
    <section className="py-16 bg-brand-primary">
      <div className="container max-w-7xl mx-auto px-4 sm:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
          <div className="space-y-3">
            <Skeleton className="h-12 sm:h-16 w-72" />
            <Skeleton className="h-6 w-80" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex gap-6 px-4 sm:px-12 lg:px-24 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="shrink-0 w-[280px] sm:w-[380px] lg:w-[450px] space-y-5">
            <Skeleton className="aspect-square rounded-3xl" />
            <div className="flex justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactSkeleton() {
  return (
    <section className="py-16 px-4 sm:px-12 lg:px-24 bg-brand-secondary/10 border-t border-brand-border">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 sm:h-20 w-full max-w-md" />
            <Skeleton className="h-6 w-72" />
            <div className="space-y-6 pt-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-[500px] sm:h-[600px] rounded-[2.5rem]" />
        </div>
      </div>
    </section>
  );
}

export function ShopProductsGridSkeleton() {
  return (
    <section className="pb-28 sm:pb-36 px-4 sm:px-12 lg:px-24 relative z-10">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-[#0d0d11]/80 backdrop-blur-md border border-brand-border rounded-[2rem] p-5">
              <Skeleton className="aspect-square rounded-[1.6rem] mb-5" />
              <div className="space-y-3 px-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="grid grid-cols-2 gap-2 border-t border-brand-border/40 pt-4">
                  <Skeleton className="h-8 rounded-lg" />
                  <Skeleton className="h-8 rounded-lg" />
                </div>
              </div>
              <Skeleton className="h-11 w-full mt-4 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryGridSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
      ))}
    </div>
  );
}

export function FullPageSkeleton() {
  return (
    <div className="min-h-screen bg-brand-primary">
      <HeroSkeleton />
      <StatsSkeleton />
      <AboutSkeleton />
      <AchievementsSkeleton />
      <ScheduleSkeleton />
      <ExperienceSkeleton />
      <SkillsSkeleton />
      <PricingSkeleton />
      <GalleryPreviewSkeleton />
      <ProductsSkeleton />
      <ContactSkeleton />
    </div>
  );
}
