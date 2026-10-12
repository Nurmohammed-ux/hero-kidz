import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link 
      href="/" 
      className="group inline-flex items-center gap-3 transition-transform duration-300 hover:scale-105"
    >
      {/* Logo Image with a subtle glowing/shadow background */}
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-tr from-primary/20 via-primary/10 to-transparent p-2 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:shadow-primary/30">
        <Image
          alt="HeroKidz Logo"
          src="/assets/logo.png"
          width={40}
          height={40}
          className="object-contain transition-transform duration-300 group-hover:rotate-6"
          priority
        />
      </div>

      {/* Brand Name */}
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-tight text-foreground">
          Hero<span className="text-primary transition-colors duration-300 group-hover:brightness-110">Kidz</span>
        </span>
        {/* Optional tagline or subtle secondary text */}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/80">
          Adventure Awaits
        </span>
      </div>
    </Link>
  );
};

export default Logo;