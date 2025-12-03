"use client";

import { useState, useActionState } from "react";
import { AddProject } from "@app/lib/queries";
import PromoSelect from "@/components/PromoSelect";
import ProjectSelect from "@/components/ProjectSelect";

type AddProjectFormProps = {
  promoOptions: string[];
  projectOptions: string[];
};

const initialState = {
  success: false,
  message: "",
};

export default function AddProjectForm({
  promoOptions,
  projectOptions,
}: AddProjectFormProps) {
  const [promo, setPromo] = useState(promoOptions[0] ?? "");
  const [adaProject, setAdaProject] = useState(projectOptions[0] ?? "");

  
  const [state, formAction, isPending] = useActionState(
    AddProject,
    initialState,
  );

  return (
    <div
      className="
        rounded-2xl border shadow-sm 
        bg-white text-black 
        dark:bg-neutral-900 dark:text-white dark:border-neutral-700
        p-6
      "
    >
      <h1 className="text-2xl font-semibold mb-4">Proposer un projet</h1>

     
      {state.message && (
        <p
          className={`text-sm mb-4 ${
            state.success ? "text-green-600" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}

      <form action={formAction} className="space-y-4">
        {/* Titre */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Titre</label>
          <input
            name="title"
            type="text"
            required
            className="
              w-full rounded-md border 
              bg-white dark:bg-neutral-800 
              border-neutral-300 dark:border-neutral-700
              px-3 py-2 text-sm
            "
            placeholder="Nom du projet"
          />
        </div>

     
        <div className="space-y-1">
          <label className="text-sm font-medium">URL Github</label>
          <input
            name="githubUrl"
            type="url"
            required
            className="
              w-full rounded-md border 
              bg-white dark:bg-neutral-800 
              border-neutral-300 dark:border-neutral-700
              px-3 py-2 text-sm
            "
            placeholder="https://github.com/..."
          />
        </div>

       
        <div className="space-y-1">
          <label className="text-sm font-medium">URL de démo</label>
          <input
            name="demoUrl"
            type="url"
            required   
            className="
              w-full rounded-md border 
              bg-white dark:bg-neutral-800 
              border-neutral-300 dark:border-neutral-700
              px-3 py-2 text-sm
            "
            placeholder="https://..."
          />
        </div>

        
        <div className="space-y-1">
          <label className="text-sm font-medium">Promo ADA</label>
          <PromoSelect
            promoOptions={promoOptions}
            promoValue={promo}
            handlePromoChange={setPromo}
            name="promoName"
          />
        </div>

        
        <div className="space-y-1">
          <label className="text-sm font-medium">Projet ADA</label>
          <ProjectSelect
            projectOptions={projectOptions}
            projectValue={adaProject}
            handleProjectChange={setAdaProject}
            name="adaProjectName"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="
            mt-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white 
            hover:bg-blue-600 disabled:opacity-60
          "
        >
          {isPending ? "Envoi..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
