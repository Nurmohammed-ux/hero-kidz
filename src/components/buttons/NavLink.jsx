"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, className = "" }) => {
  const pathname = usePathname();

  // Smart matching: handles root "/" precisely and prevents partial string overlaps
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`relative inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-xl ${
        isActive
          ? "text-primary bg-primary/10 font-semibold shadow-sm shadow-primary/5"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
      } ${className}`}
    >
      {/* Optional subtle active indicator dot or left border accent */}
      {isActive && (
        <span className="absolute left-1.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      )}

      <span className={isActive ? "pl-2" : ""}>{children}</span>
    </Link>
  );
};

export default NavLink;
