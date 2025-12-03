import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <main
      className="
        min-h-screen flex flex-col items-center justify-center
        bg-white text-black 
        dark:bg-black dark:text-white
        px-6
      "
    >
      
      <header className="absolute top-6 right-6">
        <ModeToggle />
      </header>

      
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Adaverse – Projets étudiants
        </h1>

        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          Explore les projets réalisés par les promos ADA Tech School : sites, apps,… 
          Classés par promo, catégorie et popularité.
        </p>
      </div>

      
      <div className="mt-10">
        <Link
          href="/projects"
          className="
            inline-flex items-center justify-center
            rounded-full border border-black dark:border-white
            bg-black text-white dark:bg-white dark:text-black
            px-8 py-3 text-lg font-semibold
            hover:opacity-80 transition
          "
        >
          🚀 Voir les projets
        </Link>
      </div>
    </main>
  );
}
