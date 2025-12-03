
import { z } from "zod";

export const addProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit faire au moins 3 caractères"),

  githubUrl: z
    .url("URL GitHub invalide"),       

  demoUrl: z
    .url("URL de démo invalide"),
   
  promoName: z
    .string()
    .min(1, "Promo obligatoire"),

  adaProjectName: z
    .string()
    .min(1, "Projet ADA obligatoire"),
});

export type AddProjectInput = z.infer<typeof addProjectSchema>;
