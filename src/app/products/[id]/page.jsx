import { getSingleProduct } from "@/action/server/product";
import { fontBangla } from "@/app/layout";
import ProductDetailsView from "@/components/layouts/ProductDetailsView";
import Link from "next/link";
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description:
        "The product you are looking for could not be found on Hero Kidz.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productName = product.title || "Kids Product";

  const description =
    product.description?.slice(0, 160) ||
    `Explore ${productName} on Hero Kidz. Find exciting and fun products for kids.`;

  const productImage =
    product.image ||
    "https://i.ibb.co.com/ynLnBHjr/Fire-Shot-Capture-001-Hero-Kidz-hero-kidz-lemon-vercel-app.png";

  return {
    title: productName,

    description,

    keywords: [
      productName,
      "Hero Kidz",
      "kids products",
      "kids toys",
      "children products",
    ],

    alternates: {
      canonical: `/products/${id}`,
    },

    openGraph: {
      type: "website",
      title: `${productName} | Hero Kidz`,
      description,
      url: `/products/${id}`,
      siteName: "Hero Kidz",

      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${productName} | Hero Kidz`,
      description,
      images: [productImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        {" "}
        <div className="bg-primary/10 p-6 rounded-full mb-6 text-primary animate-bounce">
          {" "}
          <FaBoxOpen className="w-16 h-16" />{" "}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-2">
          Oops! Product Not Found
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-md mb-8">
          The toy you are looking for might have been removed, sold out, or the
          link is incorrect.
        </p>
        <Link
          href="/products"
          className="btn btn-primary btn-lg rounded-2xl shadow-md hover:shadow-lg hover:shadow-primary/30 flex items-center gap-2 font-bold px-8"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to All Toys
        </Link>
      </div>
    );
  }

  return (
    <ProductDetailsView
      product={product}
      banglaFontClass={fontBangla.className}
    />
  );
}
