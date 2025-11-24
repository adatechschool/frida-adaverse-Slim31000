CREATE TYPE "public"."promo_name" AS ENUM('Frida', 'Grace', 'Frances', 'Fatoumata');--> statement-breakpoint
CREATE TABLE "ada_project" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "ada_project_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "ada_promo" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "promo_name" DEFAULT 'Frida' NOT NULL,
	"start_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"illustration_url" varchar(512),
	"slug" varchar(255) NOT NULL,
	"github_url" varchar(512),
	"demo_url" varchar(512),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone,
	"ada_project_id" integer NOT NULL,
	"promotion_id" integer NOT NULL,
	CONSTRAINT "student_projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_ada_project_id_ada_project_id_fk" FOREIGN KEY ("ada_project_id") REFERENCES "public"."ada_project"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_promotion_id_ada_promo_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."ada_promo"("id") ON DELETE restrict ON UPDATE no action;