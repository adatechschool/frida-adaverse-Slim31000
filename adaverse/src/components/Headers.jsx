// components/Headers.tsx
"use client";

import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";


const Headers = ({ onAddProjectClick }) => {
  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <Link href="/">
          Adaverse
          </Link>
          
        </h1>

        <div className="grid grid-flow-col items-center justify-items-end gap-4">
          <button
            type="button"
            onClick={onAddProjectClick}
            className="border-2 rounded-lg bg-blue-600 text-black px-4 py-2 hover:bg-blue-800"
          >
            proposer un projet
          </button>

          <ModeToggle />
        </div>
      </header>
    </div>
  );
};

export default Headers;
