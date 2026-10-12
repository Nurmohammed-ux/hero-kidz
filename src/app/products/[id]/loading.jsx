const Loading = () => {
  return (
    <div className="px-6 lg:px-8 py-10 animate-pulse">
      
      {/* Top Section: Image & Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        
        {/* Left: Product Image Showcase Skeleton */}
        <div className="relative w-full h-120 lg:h-150 bg-muted/20 rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-6 border border-gray-300">
          <div className="w-full h-full bg-muted/30 rounded-lg" />
        </div>

        {/* Right: Product Meta & Purchase Options Skeleton */}
        <div className="flex flex-col space-y-6">
          
          {/* Bengali Title Skeleton */}
          <div className="w-3/4 h-14 bg-muted/30 rounded-xl" />

          {/* English Title Skeleton */}
          <div className="w-full h-10 bg-muted/35 rounded-xl" />

          {/* Ratings & Reviews Skeleton */}
          <div className="flex items-center gap-4">
            <div className="w-24 h-7 bg-muted/30 rounded-lg" />
            <div className="w-36 h-5 bg-muted/20 rounded-md" />
          </div>

          {/* Price Tag Skeleton */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-300 border-dashed">
            <div className="w-32 h-10 bg-muted/35 rounded-xl" />
            <div className="w-20 h-6 bg-muted/20 rounded-md" />
            <div className="ml-auto w-28 h-7 bg-emerald-500/10 rounded-md" />
          </div>

          {/* Key Features Bullets Skeleton */}
          <div className="bg-muted/30 rounded-xl p-4 space-y-3">
            <div className="w-32 h-4 bg-muted/40 rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="w-full h-6 bg-muted/35 rounded-md" />
              <div className="w-full h-6 bg-muted/35 rounded-md" />
              <div className="w-full h-6 bg-muted/35 rounded-md" />
              <div className="w-full h-6 bg-muted/35 rounded-md" />
            </div>
          </div>

          {/* Quantity Counter & Buttons Skeleton */}
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-6 bg-muted/30 rounded-md" />
              <div className="w-32 h-10 bg-muted/30 rounded-xl" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="h-14 bg-muted/30 rounded-2xl" />
              <div className="h-14 bg-muted/20 rounded-2xl border border-gray-300" />
            </div>
          </div>

          {/* Trust Badges Skeleton */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-300">
            <div className="w-full h-6 bg-muted/20 rounded-md" />
            <div className="w-full h-6 bg-muted/20 rounded-md" />
          </div>

        </div>
      </div>

      {/* Bottom Tabs Section Skeleton */}
      <div className="mt-16 bg-base-100 rounded-xl p-6 sm:p-10 shadow-sm border border-gray-300">
        
        {/* Tab Headers Skeleton */}
        <div className="flex items-center gap-6 border-b border-gray-300 border-dashed pb-6">
          <div className="w-44 h-8 bg-muted/30 rounded-lg" />
          <div className="w-48 h-8 bg-muted/20 rounded-lg" />
        </div>

        {/* Tab Content Paragraph Skeleton */}
        <div className="pt-6 space-y-3">
          <div className="w-full h-5 bg-muted/30 rounded-md" />
          <div className="w-full h-5 bg-muted/30 rounded-md" />
          <div className="w-5/6 h-5 bg-muted/30 rounded-md" />
          <div className="w-2/3 h-5 bg-muted/30 rounded-md" />
        </div>

      </div>

    </div>
  );
};

export default Loading;