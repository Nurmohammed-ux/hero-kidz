import Products from "@/components/home/Products";

export const metadata = {
  title: "All Products",

  description:
    "Explore all products available on Hero Kidz. Discover fun, engaging, and exciting products for children.",

  alternates: {
    canonical: "/products",
  },

  openGraph: {
    title: "All Products | Hero Kidz",

    description:
      "Explore all products available on Hero Kidz. Discover fun and exciting products for children.",

    url: "/products",

    images: [
      {
        url: "https://i.ibb.co.com/sp7SbcHW/Fire-Shot-Capture-002-All-Products-Hero-Kidz-hero-kidz-lemon-vercel-app.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz all products page",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "All Products | Hero Kidz",

    description: "Explore all products available on Hero Kidz.",

    images: [
      "https://i.ibb.co.com/sp7SbcHW/Fire-Shot-Capture-002-All-Products-Hero-Kidz-hero-kidz-lemon-vercel-app.png",
    ],
  },
};

const ProductsPage = () => {
  return (
    <div>
      <Products />
    </div>
  );
};

export default ProductsPage;
