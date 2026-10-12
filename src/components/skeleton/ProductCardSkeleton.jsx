const ProductCardSkeleton = () => {
  return (
    <div className="card bg-base-100 border border-gray-50 shadow-sm rounded-2xl overflow-hidden flex flex-col justify-between animate-pulse">
      
      {/* Edge-to-Edge Image Skeleton Container */}
      <div className="relative w-full h-80 bg-muted/30">
        
        {/* Discount Badge Placeholder (Top Right) */}
        <div className="absolute top-3 right-3 w-16 h-6 bg-muted-foreground/20 rounded-full" />

        {/* Sold Count Badge Placeholder (Top Left) */}
        <div className="absolute top-3 left-3 w-16 h-6 bg-muted-foreground/20 rounded-lg" />
      </div>

      {/* Card Body Content Skeleton */}
      <div className="p-5 flex flex-col grow space-y-3">
        
        {/* Ratings & Reviews Row */}
        <div className="flex items-center justify-between">
          <div className="w-16 h-5 bg-muted/40 rounded-md" />
          <div className="w-20 h-4 bg-muted/30 rounded-md" />
        </div>

        {/* Product Title (2 lines) */}
        <div className="space-y-2 pt-1">
          <div className="w-full h-5 bg-muted/40 rounded-md" />
          <div className="w-3/4 h-5 bg-muted/40 rounded-md" />
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 pt-1">
          <div className="w-24 h-6 bg-muted/40 rounded-md" />
          <div className="w-16 h-4 bg-muted/30 rounded-md" />
        </div>

        {/* Action Buttons Skeleton (Matches btn-lg height) */}
        <div className="grid grid-cols-2 gap-2 pt-4 mt-auto">
          <div className="h-12 bg-muted/30 rounded-xl" />
          <div className="h-12 bg-muted/30 rounded-xl" />
        </div>

      </div>
    </div>
  );
};

export default ProductCardSkeleton;