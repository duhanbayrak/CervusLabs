"use client";

export function BackgroundLayerAbout() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background-light dark:bg-[#0B0F15] transition-colors duration-300">
      {/* Network Grid */}
      <div className="absolute inset-0 network-grid [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_100%)]" />

      {/* Antler SVG Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none rotate-12">
        <svg
          className="w-full h-full text-primary dark:text-white"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <path d="M100 170L85 140H115L100 170Z" />
          <path d="M85 140L75 110L100 100L125 110L115 140" />
          <path d="M75 110L55 105L65 130L85 140" />
          <path d="M125 110L145 105L135 130L115 140" />
          <path d="M75 110L70 90L100 100L130 90L125 110" />
          <path d="M70 90L60 70L40 70L40 50" />
          <path d="M60 70L80 50L80 30" />
          <path d="M80 50L60 40" />
          <path d="M130 90L140 70L160 70L160 50" />
          <path d="M140 70L120 50L120 30" />
          <path d="M120 50L140 40" />
        </svg>
      </div>

      {/* Hero Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] hero-glow blur-3xl opacity-60" />

      {/* Floating Orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-0.5 h-0.5 bg-primary dark:bg-white rounded-full opacity-50 animate-float"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-primary dark:bg-white rounded-full opacity-30 animate-float"
        style={{ animationDelay: "2.5s" }}
      />
    </div>
  );
}
