"use client";

import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

const technologies = [
  {
    name: "n8n",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          fill="#FF6D5A"
          className="dark:fill-[#FF6D5A]"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="#FF6D5A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dark:stroke-[#FF6D5A]"
          fill="none"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="#FF6D5A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dark:stroke-[#FF6D5A]"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.998 24c-2.246 0-4.274-.604-5.97-1.624l.857-.987c1.56.95 3.456 1.51 5.113 1.51 5.283 0 8.01-2.64 8.01-7.134 0-4.484-2.546-7.12-8.01-7.12-1.657 0-3.553.56-5.113 1.51l-.857-.987C4.724 2.604 6.752 2 11.998 2c7.998 0 11.74 3.64 11.74 9.134 0 5.494-3.742 9.134-11.74 9.134zm-5.97-1.624c-.3.346-.604.688-.857 1.01C2.604 20.99 0 17.37 0 12.134 0 6.898 2.604 3.278 6.171.748c.253.322.557.664.857 1.01C4.274 3.278 2.246 6.898 2.246 12.134c0 5.236 2.028 8.856 4.782 10.242z"
          fill="#339933"
          className="dark:fill-[#339933]"
        />
        <path
          d="M12.14 7.76c-1.657 0-3.553.56-5.113 1.51l-.857-.987C8.866 6.604 10.894 6 12.14 6c7.998 0 11.74 3.64 11.74 9.134 0 5.494-3.742 9.134-11.74 9.134-2.246 0-4.274-.604-5.97-1.624l.857-.987c1.56.95 3.456 1.51 5.113 1.51 5.283 0 8.01-2.64 8.01-7.134 0-4.484-2.727-7.12-8.01-7.12z"
          fill="#339933"
          className="dark:fill-[#339933]"
        />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.5594 15.5333C23.4708 15.8083 23.2792 16.05 23.0125 16.2125C22.7458 16.375 22.4208 16.45 22.0958 16.425L18.3042 16.1625L16.8 19.575C16.65 19.9 16.4 20.175 16.0833 20.3583C15.7667 20.5417 15.4 20.625 15.0333 20.5958L12.5333 20.4C12.1667 20.4 11.8083 20.2917 11.5 20.0875C11.1917 19.8833 10.9458 19.5917 10.7917 19.25L9.20833 15.8375L5.41667 15.575C5.09167 15.55 4.78333 15.4208 4.5375 15.2083C4.29167 14.9958 4.12083 14.7125 4.05 14.4L2.54583 8.39167C2.47083 8.11667 2.5 7.825 2.62917 7.57083C2.75833 7.31667 2.97917 7.11667 3.25 7.00833L10.65 4.10833C10.925 4.01667 11.225 4.02917 11.4917 4.15417C11.7583 4.27917 11.9708 4.50833 12.0875 4.79167L13.5917 8.20417L17.3833 8.46667C17.7083 8.49167 18.0167 8.62083 18.2625 8.83333C18.5083 9.04583 18.6792 9.32917 18.75 9.64167L20.2542 15.65C20.3042 15.8583 20.3042 16.075 20.2542 16.2833L23.5594 15.5333Z"
          fill="#336791"
          className="dark:fill-[#336791]"
        />
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
          fill="#336791"
          className="dark:fill-[#336791]"
        />
        <path
          d="M12.5 7H11.5L9 17H10.5L11.5 13H12.5L13.5 17H15L12.5 7ZM11.5 11.5L12 9.5L12.5 11.5H11.5Z"
          fill="white"
          className="dark:fill-white"
        />
      </svg>
    ),
  },
  {
    name: "REST APIs",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
          fill="#4A90E2"
          className="dark:fill-[#4A90E2]"
        />
        <path
          d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
          fill="#4A90E2"
          className="dark:fill-[#4A90E2]"
        />
      </svg>
    ),
  },
];

export function TechnologiesDeployed() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-xl font-display font-bold text-gray-400 uppercase tracking-widest mb-10 text-center">
            {t.caseStudies.technologies.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 items-center opacity-90 hover:opacity-100 transition-all duration-500">
            {technologies.map((tech, index) => (
              <SectionTransition key={tech.name} delay={0.1 * index}>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center border border-gray-200 dark:border-white/10 group-hover:border-primary dark:group-hover:border-white transition-colors p-3">
                    {tech.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {tech.name}
                  </span>
                </div>
              </SectionTransition>
            ))}
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
