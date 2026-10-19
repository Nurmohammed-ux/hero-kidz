import Link from "next/link";
import { 
  FaRobot, 
  FaPuzzlePiece, 
  FaFlask, 
  FaGraduationCap, 
  FaArrowRight, 
  FaShieldAlt, 
  FaTruck, 
  FaHeadset 
} from "react-icons/fa";

const STEM_CATEGORIES = [
  {
    title: "Coding & Robotics",
    description: "Build logic and basic programming skills with interactive smart robots.",
    icon: <FaRobot className="h-8 w-8 text-primary" />,
    bg: "bg-orange-50",
    border: "border-orange-100",
    href: "/products?category=robotics",
  },
  {
    title: "Puzzles & Logic",
    description: "Enhance spatial awareness and critical thinking through engaging blocks.",
    icon: <FaPuzzlePiece className="h-8 w-8 text-primary" />,
    bg: "bg-amber-50",
    border: "border-amber-100",
    href: "/products?category=puzzles",
  },
  {
    title: "Science & DIY Kits",
    description: "Hands-on chemistry and physics experiments for young scientists.",
    icon: <FaFlask className="h-8 w-8 text-primary" />,
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    href: "/products?category=science",
  },
  {
    title: "Early STEM Learning",
    description: "Play-based educational tools designed for toddlers and preschoolers.",
    icon: <FaGraduationCap className="h-8 w-8 text-primary" />,
    bg: "bg-blue-50",
    border: "border-blue-100",
    href: "/products?category=early-learning",
  },
];

const TRUST_BADGES = [
  {
    icon: <FaShieldAlt className="h-5 w-5 text-primary" />,
    title: "100% Non-Toxic",
    subtitle: "Child-safe certified materials",
  },
  {
    icon: <FaTruck className="h-5 w-5 text-primary" />,
    title: "Fast 24h Delivery",
    subtitle: "Inside Dhaka city & nationwide",
  },
  {
    icon: <FaHeadset className="h-5 w-5 text-primary" />,
    title: "Parent Support",
    subtitle: "Dedicated customer care team",
  },
];

const StemHighlights = () => {
  return (
    <section className="py-16 px-8">
      
      {/* SECTION HEADER */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F28C38]/15 text-primary font-bold text-sm uppercase tracking-wider mb-3">
          🧠 Learn Through Play
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3C352D] tracking-tight">
          Unlock Your Child&apos;s <span className="text-primary">Superpowers</span>
        </h2>
        <p className="mt-3 text-base text-[#776B5D] leading-relaxed">
          Explore curated categories designed by education experts to inspire curiosity, problem-solving, and creativity.
        </p>
      </div>

      {/* CATEGORIES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {STEM_CATEGORIES.map((cat, idx) => (
          <Link
            key={idx}
            href={cat.href}
            className={`group p-6 rounded-xl bg-white border ${cat.border} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
          >
            {/* Decorative background accent blob on hover */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-[#F28C38]/5 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

            <div>
              <div className={`w-12 h-12 rounded-2xl ${cat.bg} flex items-center justify-center mb-5 shadow-xs group-hover:rotate-6 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-[#3C352D] group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="mt-2 text-sm sm:text-sm text-[#776B5D] leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-primary">
              <span>Explore Category</span>
              <FaArrowRight className="h-3 w-6 transform group-hover:translate-x-1.5 transition-transform" size={20} />
            </div>
          </Link>
        ))}
      </div>

      {/* TRUST BADGES BAR */}
      <div className="bg-white rounded-xl border border-[#EFE8DC] p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
        {TRUST_BADGES.map((badge, idx) => (
          <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D2]">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center shrink-0">
              {badge.icon}
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#3C352D]">{badge.title}</h4>
              <p className="text-sm text-[#776B5D] mt-0.5">{badge.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default StemHighlights;