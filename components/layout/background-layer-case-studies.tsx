"use client";

export function BackgroundLayerCaseStudies() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background-light dark:bg-[#0B0F15] transition-colors duration-300">
      {/* Network Grid */}
      <div className="absolute inset-0 network-grid [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_100%)]" />

      {/* Antler SVG Background - Top Left */}
      <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none rotate-45">
        <svg
          className="w-full h-full text-primary dark:text-white"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <path d="M100 170L85 140H115L100 170Z" />
          <path d="M85 140L75 110L100 100L125 110L115 140" />
          <path d="M75 110L55 105L65 130L85 140" />
        </svg>
      </div>

      {/* Antler SVG Background - Bottom Right */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] opacity-[0.02] dark:opacity-[0.04] pointer-events-none -rotate-12">
        <svg
          className="w-full h-full text-primary dark:text-white"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <path d="M100 170L85 140H115L100 170Z" />
          <path d="M85 140L75 110L100 100L125 110L115 140" />
          <path d="M125 110L145 105L135 130L115 140" />
        </svg>
      </div>
    </div>
  );
}
