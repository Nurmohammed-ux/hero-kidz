import Image from "next/image";
import Link from "next/link";
import {
  FaBrain,
  FaShieldAlt,
  FaSmile,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
} from "react-icons/fa";

const FEATURES = [
  {
    icon: <FaBrain className="h-6 w-6 text-primary" />,
    title: "STEM-Focused Learning",
    description:
      "Designed to foster critical thinking, coding logic, and creative problem-solving skills.",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: <FaShieldAlt className="h-6 w-6 text-primary" />,
    title: "100% Kid-Safe & Non-Toxic",
    description:
      "Tested according to global child safety standards with ultra-durable, smooth-edge materials.",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: <FaSmile className="h-6 w-6 text-primary" />,
    title: "Screen-Free Engagement",
    description:
      "Keep kids productively entertained for hours with hands-on, practical building kits.",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
];

const REVIEWS = [
  {
    name: "Tanvir Ahmed",
    role: "Parent of 7yo",
    comment:
      "The engineering robotics set was an absolute hit for my son! Great build quality and super clear instructions.",
    rating: 5,
    avatar: "https://i.ibb.co.com/203h05Sq/image.png",
  },
  {
    name: "Sabrina Yasmin",
    role: "Primary Educator",
    comment:
      "As a teacher, I love how Hero Kidz merges play with real scientific concepts. Fast delivery in Dhaka too!",
    rating: 5,
    avatar: "https://i.ibb.co.com/W4L8SFbK/image.png",
  },
];

const WhyHeroKidz = () => {
  return (
    <section className="py-10 px-8 space-y-16">
      {/* SECTION 1: FEATURES & VALUE PROPOSITION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* LEFT COLUMN: TEXT & HEADLINE */}
        <div className="lg:col-span-5 space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F28C38]/20 text-primary font-bold text-sm uppercase tracking-wider">
            🚀 Why Hero Kidz?
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3C352D] leading-tight">
            Empowering Next-Gen <span className="text-primary">Innovators</span>{" "}
            & Builders
          </h2>

          <p className="text-sm sm:text-base text-[#776B5D] leading-relaxed">
            We curate high-quality STEM toys that spark curiosity, boost
            confidence, and turn everyday play into an exciting educational
            journey for kids of all ages.
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-[#d97525] text-white font-bold text-sm transition shadow-lg shadow-orange-200 cursor-pointer"
          >
            Explore All Toys <FaArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* RIGHT COLUMN: FEATURE CARDS */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl bg-white border ${feat.border} shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between`}
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mb-4`}
                >
                  {feat.icon}
                </div>
                <h3 className="font-bold text-base text-[#3C352D] mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-[#776B5D] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: PARENT REVIEWS */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#EFE8DC] p-8 sm:p-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#3C352D]">
              Loved by <span className="text-primary">Parents</span> & Kids
            </h3>
            <p className="text-sm sm:text-sm text-[#776B5D] mt-1">
              See what families in Bangladesh are saying about Hero Kidz.
            </p>
          </div>

          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="h-4 w-4" />
            ))}
            <span className="text-sm font-bold text-[#3C352D] ml-2">
              4.9 / 5 Rating
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-[#EFE8DC] shadow-xs relative"
            >
              <FaQuoteLeft className="text-primary/15 h-8 w-8 absolute top-4 right-4" />
              <div className="flex items-center gap-1 text-amber-400 mb-3 text-sm">
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-sm sm:text-sm text-[#3C352D] leading-relaxed mb-6 font-medium">
                &quot;{rev.comment}&quot;
              </p>

              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#3C352D]">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-[#776B5D]">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHeroKidz;
