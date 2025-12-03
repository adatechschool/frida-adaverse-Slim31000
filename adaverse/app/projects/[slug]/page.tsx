// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { getProjectBySlug } from "@app/lib/queries";
import Image from "next/image";
import { Card,CardHeader,CardContent } from "@/components/ui/card";
function formatDate(date: Date | string | null) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}
type PageProps = {
  params: Promise<{ slug: string }>; 
};

export default async function ProjectDetailPage({ params }: PageProps) {
  
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  const project = await getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  return (
    <main
      className="min-h-screen 
      bg-white text-black border-black 
      dark:bg-black dark:text-white dark:border-white 
      px-6 py-10"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <p className="text-xs text-neutral-500">
          /projects/{project.slug}
        </p>

        <header className="flex items-center justify-between">
          <Link href="/projects" className="text-2xl font-semibold">
            Adaverse
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/projects"
              className="rounded-full border px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              Toutes les promos
            </Link>

            <Link
              href="/addProject"
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
            >
              proposer un projet
            </Link>

            <ModeToggle />
          </div>
        </header>

        <section className="flex flex-col items-center gap-6">
  <Card
    className="
      w-full max-w-xl
      bg-white text-black border border-black
      dark:bg-neutral-900 dark:text-white dark:border-white
      transition-colors flex flex-col
      rounded-3xl shadow-sm
    "
  >
    <CardHeader className="space-y-4 pb-4">
     
      <div className="relative">
        <div
          className="
            aspect-video w-full rounded-2xl
            bg-neutral-200 text-neutral-600
            dark:bg-neutral-800 dark:text-neutral-400
            flex items-center justify-center overflow-hidden
          "
        >
          {project.illustrationUrl ? (
            <Image
              src={project.illustrationUrl}
              alt={project.title}
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
            />
          )}
        </div>

        <span
          className="
            absolute left-3 top-3
            rounded-full border px-3 py-1 text-xs
            bg-white/80 dark:bg-neutral-900/80
          "
        >
          {project.promoName}
        </span>
      </div>

     
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold">{project.title}</h1>

        <p className="text-xs text-neutral-700 dark:text-neutral-400">
          Projet ADA : {project.adaProjectName}
        </p>

        <p className="text-xs text-neutral-500">
          le {formatDate(project.createdAt)}
        </p>

        {project.publishedAt && (
          <p className="text-xs text-green-600 dark:text-green-400">
            Publié le {formatDate(project.publishedAt)}
          </p>
        )}
      </div>
    </CardHeader>

    <CardContent className="mt-auto flex flex-col gap-3 text-xs pt-0 pb-4">
      
      <div className="flex flex-col gap-2 w-full max-w-xs mx-auto mt-2">
        {project.demoUrl && (
          <Link
            href={project.demoUrl}
            target="_blank"
            className="
              inline-flex items-center justify-center
              rounded-full border px-4 py-2 text-sm font-medium
              bg-green-100 hover:bg-green-200
              text-green-900
            "
          >
            ▶︎ Voir la démo
          </Link>
        )}

        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            className="
              inline-flex items-center justify-center
              rounded-full border px-4 py-2 text-sm font-medium
              bg-blue-100 hover:bg-blue-200
              text-blue-900
            "
          >
            🐱 Voir le code
          </Link>
        )}
      </div>
    </CardContent>
  </Card>
</section>

      </div>
    </main>
  );
}
