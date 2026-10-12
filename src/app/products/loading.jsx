import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header Skeleton */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3 animate-pulse">
        <div className="w-32 h-6 bg-muted/40 rounded-full mx-auto" />
        <div className="w-64 h-10 bg-muted/40 rounded-md mx-auto" />
        <div className="w-96 h-5 bg-muted/30 rounded-md mx-auto" />
      </div>

      {/* Grid of 8 Skeletons mimicking the product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>

    </div>
  );
}