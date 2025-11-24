import {
  pgTable,
  serial,
  varchar,
  integer,
  date,
  timestamp,
  pgEnum
} from "drizzle-orm/pg-core";

export const promoName = pgEnum("promo_name",[
  "Frida",
  "Grace",
  "Frances",
  "Fatoumata"
] )

export const adaPromo = pgTable("ada_promo",{
    id: serial('id').primaryKey(),
    name: promoName('name').notNull().default("Frida"),
    startDate: date('start_date').notNull(),
})

export const adaProject = pgTable("ada_project",{
    id: serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull().unique(),
    
})

export const studentProjects = pgTable("student_projects", {
  id: serial("id").primaryKey(),

  // Infos projet
  title: varchar("title", { length: 255 }).notNull(),
  illustrationUrl: varchar("illustration_url", { length: 512 }),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  githubUrl: varchar("github_url", { length: 512 }),
  demoUrl: varchar("demo_url", { length: 512 }),

  // Dates
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }),

  // Relations
  adaProjectId: integer("ada_project_id")
    .notNull()
    .references(() => adaProject.id, { onDelete: "restrict" }),

  promotionId: integer("promotion_id")
    .notNull()
    .references(() => adaPromo.id, { onDelete: "restrict" }),
});
