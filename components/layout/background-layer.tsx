"use client";

export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background-light dark:bg-[#0B0F15] transition-colors duration-300">
      {/* Network Grid */}
      <div className="absolute inset-0 network-grid [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_100%)]" />

      {/* Hero Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] hero-glow blur-3xl opacity-60" />

      {/* Floating Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-1 h-1 bg-gray-400 dark:bg-white rounded-full opacity-40 animate-pulse-slow"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-3/4 right-1/4 w-1 h-1 bg-gray-400 dark:bg-white rounded-full opacity-30 animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-gray-500 dark:bg-white rounded-full opacity-20 animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-primary dark:bg-white rounded-full opacity-50 animate-float"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-primary dark:bg-white rounded-full opacity-30 animate-float"
        style={{ animationDelay: "2.5s" }}
      />
    </div>
  );
}
