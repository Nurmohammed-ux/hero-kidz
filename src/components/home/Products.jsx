// import products from "@/data/toys.json";
import { getProducts } from "@/action/server/product";
import ProductCard from "../cards/ProductCard";

const Products = async () => {
  const products = (await getProducts()) || [];
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 mt-8">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-6">
        {/* Requested Launch Discount Badge */}
        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide shadow-inner">
          🎉 Launch Products
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Our Featured Toys
        </h2>

        <p className="text-base md:text-xl text-muted-foreground">
          Explore our collection of interactive, fun, and educational toys
          designed to boost your child&apos;s cognitive development.
        </p>
      </div>

      {/* Products Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
