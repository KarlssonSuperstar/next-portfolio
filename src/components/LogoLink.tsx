"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LogoLink() {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="absolute top-12 left-4 pointer-events-auto text-white hover:text-white/70 transition-colors"
      aria-label="Scroll to top"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Images/Me/Artboard 1.svg"
        alt="Karlsson"
        className="w-20 h-auto"
        style={{ filter: "invert(1)" }}
      />
    </Link>
  );
}
