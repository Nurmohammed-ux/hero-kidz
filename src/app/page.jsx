import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <section>
        <Banner />
        <Products />
      </section>
    </div>
  );
}
