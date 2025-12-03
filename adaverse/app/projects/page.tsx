import ProjectsExplorer from "@/components/ProjectsExplorer";

import {
  getAllProjects,
  getPromoOptions,
  getProjectOptions,
} from "@app/lib/queries";

export default async function ProjectsPage() {
  const [promoOptions, projectOptions, initialProjects] = await Promise.all([
    getPromoOptions(),
    getProjectOptions(),
    getAllProjects(),
  ]);

  return (
    <main className="min-h-screen 
        bg-white text-black border-black 
        dark:bg-black dark:text-white dark:border-white 
        px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        
        
        <ProjectsExplorer
          promoOptions={promoOptions}
          projectOptions={projectOptions}
          initialProjects={initialProjects}
        />
      </div>
    </main>
  );
}
