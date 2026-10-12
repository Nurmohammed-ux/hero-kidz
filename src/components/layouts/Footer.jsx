import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { HiHeart, HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 bg-muted/30 pt-16 pb-12 overflow-hidden">
      {/* Decorative top accent glow using matching linear gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-border/60">
          {/* Brand & Bio (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Reused Logo Brand Styling with hover effects */}
            <Logo/> 

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm pt-1">
              Empowering the next generation of heroes through playful
              adventures, learning experiences, and endless fun. Adventure
              awaits!
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaYoutube, href: "#", label: "YouTube" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-muted-foreground transition-all duration-200 hover:text-primary hover:border-primary/50 hover:scale-110 shadow-sm"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {["Home", "About Us", "Activities", "Programs", "Contact"].map(
                (item, index) => {
                  const slug =
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`;
                  return (
                    <li key={index}>
                      <Link
                        href={slug}
                        className="text-muted-foreground transition-colors hover:text-primary inline-block hover:translate-x-1 duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>

          {/* Support Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                "Help Center",
                "Safety Guidelines",
                "Terms of Service",
                "Privacy Policy",
                "FAQs",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-primary inline-block hover:translate-x-1 duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <HiLocationMarker className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>123 Adventure Lane, Hero City, HC 90210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiPhone className="h-4 w-4 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiMail className="h-4 w-4 text-primary shrink-0" />
                <span>support@herokidz.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} HeroKidz. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with{" "}
            <HiHeart className="h-3.5 w-3.5 text-red-500 animate-pulse" /> for
            little heroes everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
