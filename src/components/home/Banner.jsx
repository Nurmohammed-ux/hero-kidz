import { fontBangla } from "@/app/layout";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi"; // Assuming you use react-icons

const Banner = () => {
  return (
    <div className="relative w-full bg-muted/30 overflow-hidden rounded-3xl">
      {/* Decorative Background Pattern (optional, adds depth) */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dotPattern"
              patternUnits="userSpaceOnUse"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              <circle
                cx="1"
                cy="1"
                r="1"
                fill="currentColor"
                className="text-primary/30"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative px-6 py-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Text Content Area */}
        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide shadow-inner">
            🎉 Launch Discount
          </span>

          <h2
            className={`${fontBangla.className} font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-20 tracking-tight drop-shadow-sm`}
          >
            <span style={{ wordSpacing: "0.25em" }}>আপনার শিশুকে দিন</span>{" "}
            <br />
            <span className="text-primary" style={{ wordSpacing: "0.25em" }}>
              আনন্দময় ভবিষ্যত
            </span>
          </h2>

          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0">
            Ignite their imagination! Shop our curated collection of educational
            toys and learning tools now and get{" "}
            <strong className="text-foreground font-semibold">
              up to 15% OFF
            </strong>{" "}
            everything.
          </p>

          <div className="pt-4 relative group">
            {/* Button Glow Effect */}
            <div className="absolute -inset-1 bg-primary/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <button className="btn btn-primary btn-outline relative inline-flex items-center gap-2.5 px-8 py-3.5 text-lg rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-primary/40">
              Explore More
              <HiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Image Area */}
        <div className="flex-1 flex justify-center items-center relative lg:pr-10">
          {/* Large decorative circle behind the image */}
          <div className="absolute w-96 h-96 md:w-110 md:h-110 bg-primary/5 rounded-full -bottom-10 -right-10 blur-3xl"></div>

          <div className="relative w-full h-auto aspect-5/4 max-w-lg transition-transform duration-500 hover:rotate-1">
            <Image
              src={"/assets/hero.png"}
              alt="Happy kids playing and learning with Hero Kidz products"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 768px) 150vw, 90vw"
            />
          </div>
        </div>
      </div>

      {/* Bottom Slanted Edge (Optional styling flourish) */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-background clip-path-wave"></div>
    </div>
  );
};

export default Banner;
