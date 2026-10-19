import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import StemHighlights from "@/components/home/StemHighlights";
import WhyHeroKidz from "@/components/home/WhyHeroKidz";
import Test from "@/components/Test";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  return (
    <div className="">
      {/* <div className="border p-6">
        <p>{JSON.stringify(session)}</p>
      </div> */}
      {/* <Test /> */}
      <section>
        <Banner />
        <Products />
        <StemHighlights />
        <WhyHeroKidz />
      </section>
    </div>
  );
}
