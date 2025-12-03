"use client";

import {
  type ProjectRow,
} from "@app/lib/queries";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";

// Format date FR
function formatDate(date: Date | string | null) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}


type ProjectCardProps = {
  projects: ProjectRow[];
};




const ProjectCard = ({projects}: ProjectCardProps) => {
if (projects.length === 0) {
    return (
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Aucun projet trouvé avec ces filtres.
      </p>
    );
  }

  // 🔹 Groupement par projet Ada (adaProjectName)
  const grouped: Record<
    string,
    {
      projectName: string;
      items: ProjectRow[];
    }
  > = {};

  for (const p of projects) {
    if (!grouped[p.adaProjectName]) {
      grouped[p.adaProjectName] = {
        projectName: p.adaProjectName,
        items: [],
      };
    }
    grouped[p.adaProjectName].items.push(p);
  }

  const groupsArray = Object.values(grouped);

  return (
    <div className="space-y-8">
      {groupsArray.map((group) => (
        <section key={group.projectName} className="space-y-4">
          
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-semibold">
              {group.projectName}
            </h2>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              ({group.items.length})
            </span>
          </div>

          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {group.items.map((p) => (
    <Link
  key={p.id}
  href={`/projects/${p.slug}`}
  className="block"
>
  <Card
    className="
      bg-white text-black border border-black
      dark:bg-neutral-900 dark:text-white dark:border-white
      transition-colors flex flex-col
      hover:opacity-80 cursor-pointer
      rounded-3xl
    "
  >
    <CardHeader className="space-y-4 pb-4">
      
      <div className="relative">
        <div
          className="
            aspect-video w-full rounded-2xl
            bg-neutral-200 text-neutral-600
            dark:bg-neutral-800 dark:text-neutral-400
            flex items-center justify-center
          "
        >
          {p.illustrationUrl ? (
    <Image
      src={p.illustrationUrl}
      alt={p.title}
      width={600}
      height={400}
      className="w-full h-full object-cover"
    />
  ) : (
    <Image
      src="/projectImg.jpg"
      alt="Aperçu du projet"
      width={600}
      height={400}
      className="w-full h-full object-cover"
    />)}
        </div>

        <span
          className="
            absolute left-3 top-3
            rounded-full border px-3 py-1 text-xs
            bg-white/80 dark:bg-neutral-900/80
          "
        >
          {p.promoName}
        </span>
      </div>

      
      <div className="space-y-1">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {p.title}
        </CardTitle>

        <p className="text-xs text-neutral-700 dark:text-neutral-400">
          Projet ADA : {p.adaProjectName}
        </p>

        <p className="text-xs text-neutral-500">
          le {formatDate(p.createdAt)}
        </p>
      </div>
    </CardHeader>

    <CardContent className="mt-auto flex flex-col gap-3 text-xs pt-0 pb-4">
      {p.publishedAt && (
        <p className="text-green-700 dark:text-green-400">
          Publié le {formatDate(p.publishedAt)}
        </p>
      )}

    </CardContent>
  </Card>
</Link>
  ))}
</div>
        </section>
      ))}
    </div>
  );
}
export default ProjectCard