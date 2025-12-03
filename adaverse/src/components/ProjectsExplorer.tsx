// components/ProjectsExplorer.tsx
"use client";

import { useState, useTransition } from "react";
import {
  getProjectsByFilters,
  type ProjectRow,
} from "@app/lib/queries";

import ProjectCard from "./ProjectCard";
import PromoSelect from "./PromoSelect";
import ProjectSelect from "./ProjectSelect";
import Headers from "./Headers";
import AddProjectForm from "./AddProjectForm";

type ProjectsExplorerProps = {
  promoOptions: string[];
  projectOptions: string[];
  initialProjects: ProjectRow[];
};

export default function ProjectsExplorer({
  promoOptions,
  projectOptions,
  initialProjects,
}: ProjectsExplorerProps) {
  const [promo, setPromo] = useState<string>("ALL_PROMOS");
  const [project, setProject] = useState<string>("ALL_PROJECTS");
  const [projects, setProjects] = useState<ProjectRow[]>(initialProjects);
  const [isPending, startTransition] = useTransition();

  const [showAddForm, setShowAddForm] = useState(false);

  const sendFilters = (nextPromo: string, nextProject: string) => {
    const fd = new FormData();
    fd.append("promo", nextPromo);
    fd.append("project", nextProject);

    startTransition(() => {
      getProjectsByFilters(fd).then((res) => {
        setProjects(res);
      });
    });
  };

  const handlePromoChange = (value: string) => {
    setPromo(value);
    sendFilters(value, project);
  };

  const handleProjectChange = (value: string) => {
    setProject(value);
    sendFilters(promo, value);
  };

  const handleAddProjectClick = () => {
    setShowAddForm((prev) => !prev); 
  };

  return (
    <div className="space-y-8">
      <Headers onAddProjectClick={handleAddProjectClick} />

      
      {showAddForm && (
  <div
    className="
      fixed inset-0 
      bg-black/50              /* 🔥 fond gris/noir semi-transparent */
      backdrop-blur-sm         /* léger flou (optionnel) */
      flex items-start justify-center 
      pt-20                    /* espace depuis le haut */
      z-50
    "
    onClick={() => setShowAddForm(false)}   
  >
    <div
      onClick={(e) => e.stopPropagation()} 
      className="w-full max-w-lg mx-auto"
    >
      <AddProjectForm
        promoOptions={promoOptions}
        projectOptions={projectOptions}
      />
    </div>
  </div>
)}

      {/* Filtres */}
      <div className="flex flex-wrap gap-4 items-end">
        <PromoSelect
          promoOptions={promoOptions}
          promoValue={promo}
          handlePromoChange={handlePromoChange}
        />

        <ProjectSelect
          projectOptions={projectOptions}
          projectValue={project}
          handleProjectChange={handleProjectChange}
        />

        {isPending && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Chargement…
          </span>
        )}
      </div>

      {/* Liste des projets */}
      <ProjectCard projects={projects} />
    </div>
  );
}
