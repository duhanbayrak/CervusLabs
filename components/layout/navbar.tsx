"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "./language-switcher";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAboutPage = pathname === "/about";
  const isServicesPage = pathname === "/services";
  const isCaseStudiesPage = pathname === "/case-studies";
  const isContactPage = pathname === "/contact";

  const navLinks = [
    { href: "/services", label: t.nav.services, isHash: false },
    { href: "/case-studies", label: t.nav.caseStudies, isHash: false },
    { href: "/about", label: t.nav.about, isHash: false },
    { href: "/contact", label: t.nav.contact, isHash: false },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-gray-200/50 dark:border-white/5 glass bg-background-light/80 dark:bg-background-dark/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex-shrink-0 cursor-pointer group"
          >
            <span className="font-display font-bold text-lg tracking-[0.2em] text-primary dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
              CERVUS<span className="font-light">LABS</span>
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-12">
              {navLinks.map((link) => {
                const isActive =
                  (link.href === "/services" && isServicesPage) ||
                  (link.href === "/case-studies" && isCaseStudiesPage) ||
                  (link.href === "/about" && isAboutPage) ||
                  (link.href === "/contact" && isContactPage);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? "text-primary dark:text-white border-b-2 border-primary dark:border-white pb-1"
                        : "text-gray-700 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                      aria-label="Toggle theme"
                    >
                      {theme === "dark" ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                    </button>
                  )}
                  <button
                    className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none"
                    aria-label="Menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </div>
        </div>
      </div>
    </nav>
  );
}
