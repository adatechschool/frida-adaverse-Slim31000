"use server";

import { db } from "./db/drizzle";
import { adaProject, adaPromo, studentProjects } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { addProjectSchema } from "@app/lib/project-form-schema"; 
import { z } from "zod";


export type ProjectRow = {
  id: number;
  title: string;
  slug: string;
  githubUrl: string | null;
  demoUrl: string | null;
  illustrationUrl: string | null;
  createdAt: Date;
  publishedAt: Date | null;
  adaProjectName: string;
  promoName: string;
};


export const getPromoOptions = async (): Promise<string[]> => {
  const rows = await db
    .select({
      name: adaPromo.name,
    })
    .from(adaPromo);

  return Array.from(new Set(rows.map((r) => r.name)));
};


export const getProjectOptions = async (): Promise<string[]> => {
  const rows = await db
    .select({
      name: adaProject.name,
    })
    .from(adaProject);

  return Array.from(new Set(rows.map((r) => r.name)));
};


export const getAllProjects = async (): Promise<ProjectRow[]> => {
  const rows = await db
    .select({
      id: studentProjects.id,
      title: studentProjects.title,
      slug: studentProjects.slug,
      githubUrl: studentProjects.githubUrl,
      demoUrl: studentProjects.demoUrl,
      illustrationUrl: studentProjects.illustrationUrl,
      createdAt: studentProjects.createdAt,
      publishedAt: studentProjects.publishedAt,
      adaProjectName: adaProject.name,
      promoName: adaPromo.name,
    })
    .from(studentProjects)
    .innerJoin(adaProject, eq(studentProjects.adaProjectId, adaProject.id))
    .innerJoin(adaPromo, eq(studentProjects.promotionId, adaPromo.id));

  return rows as ProjectRow[];
};

export const getProjectsByFilters = async (
  formData: FormData,
): Promise<ProjectRow[]> => {
  const promoRaw = formData.get("promo");
  const projectRaw = formData.get("project");

  if (promoRaw !== null && typeof promoRaw !== "string") {
    throw new Error("Promo invalide");
  }
  if (projectRaw !== null && typeof projectRaw !== "string") {
    throw new Error("Projet invalide");
  }

  
  const promo =
    promoRaw === "ALL_PROMOS" || promoRaw === null ? null : promoRaw;
  const project =
    projectRaw === "ALL_PROJECTS" || projectRaw === null ? null : projectRaw;

  const promoFilter =
    typeof promo === "string" && promo.trim() !== "" ? promo.trim() : null;

  const projectFilter =
    typeof project === "string" && project.trim() !== ""
      ? project.trim()
      : null;

  let whereClause;

  if (promoFilter && projectFilter) {
    whereClause = and(
      eq(adaPromo.name, promoFilter as typeof adaPromo.$inferSelect.name),
      eq(adaProject.name, projectFilter),
    );
  } else if (promoFilter) {
    whereClause = eq(adaPromo.name, promoFilter as typeof adaPromo.$inferSelect.name);
  } else if (projectFilter) {
    whereClause = eq(adaProject.name, projectFilter);
  }

  const baseQuery = db
    .select({
      id: studentProjects.id,
      title: studentProjects.title,
      slug: studentProjects.slug,
      githubUrl: studentProjects.githubUrl,
      demoUrl: studentProjects.demoUrl,
      illustrationUrl: studentProjects.illustrationUrl,
      createdAt: studentProjects.createdAt,
      publishedAt: studentProjects.publishedAt,
      adaProjectName: adaProject.name,
      promoName: adaPromo.name,
    })
    .from(studentProjects)
    .innerJoin(adaProject, eq(studentProjects.adaProjectId, adaProject.id))
    .innerJoin(adaPromo, eq(studentProjects.promotionId, adaPromo.id));

  const rows = (whereClause
    ? await baseQuery.where(whereClause)
    : await baseQuery) as ProjectRow[];

  return rows;
};

const slugify = (text: string) => {
  return text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}



type AddProjectState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const AddProject = async (
  prevState: AddProjectState,
  formData: FormData,
): Promise<AddProjectState> => {
  const raw = {
    title: formData.get("title"),
    githubUrl: formData.get("githubUrl"),
    demoUrl: formData.get("demoUrl"),
    promoName: formData.get("promoName"),
    adaProjectName: formData.get("adaProjectName"),
  };

  const result = addProjectSchema.safeParse(raw);

  if (!result.success) {
    const flattened = z.flattenError(result.error);
;
    return {
      success: false,
      message: "Données invalides",
      errors: flattened.fieldErrors,
    };
  }

  const { title, githubUrl, demoUrl, promoName, adaProjectName } = result.data;

  const adaProjectRow = await db
    .select({ id: adaProject.id })
    .from(adaProject)
    .where(eq(adaProject.name, adaProjectName))
    .limit(1);

  const promoRow = await db
    .select({ id: adaPromo.id })
    .from(adaPromo)
    .where(eq(adaPromo.name, promoName as typeof adaPromo.$inferSelect.name))
    .limit(1);

  if (!adaProjectRow.length || !promoRow.length) {
    return {
      success: false,
      message: "Projet ou promo introuvables",
    };
  }

  const slug = slugify(title);

  await db.insert(studentProjects).values({
    title: title.trim(),
    slug,
    githubUrl,
    demoUrl,
    adaProjectId: adaProjectRow[0].id,
    promotionId: promoRow[0].id,
  });

  revalidatePath("/projects");

  return {
    success: true,
    message: "Projet ajouté avec succès !",
  };
};




export const getProjectBySlug = async (slug: string): Promise<ProjectRow | null> => {
  const rows = await db
    .select({
      id: studentProjects.id,
      title: studentProjects.title,
      slug: studentProjects.slug,
      githubUrl: studentProjects.githubUrl,
      demoUrl: studentProjects.demoUrl,
      illustrationUrl: studentProjects.illustrationUrl,
      createdAt: studentProjects.createdAt,
      publishedAt: studentProjects.publishedAt,
      adaProjectName: adaProject.name,
      promoName: adaPromo.name,
    })
    .from(studentProjects)
    .innerJoin(adaProject, eq(studentProjects.adaProjectId, adaProject.id))
    .innerJoin(adaPromo, eq(studentProjects.promotionId, adaPromo.id))
    .where(eq(studentProjects.slug, slug))
    .limit(1);

  return rows.length ? (rows[0] as ProjectRow) : null;
};