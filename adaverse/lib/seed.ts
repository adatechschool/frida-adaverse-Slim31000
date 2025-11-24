import { db } from "./db/drizzle";
import { adaPromo, adaProject, studentProjects } from "./db/schema";

async function main() {
  // -----------------------------
  // 1) PROMOS
  // -----------------------------
  const [frida] = await db
    .insert(adaPromo)
    .values({
      name: "Frida",
      startDate: "2025-06-01",
    })
    .returning();

  const [fatomata] = await db
    .insert(adaPromo)
    .values({
      name: "Fatoumata",
      startDate: "2025-01-01",
    })
    .returning();

  // -----------------------------
  // 2) PROJETS OFFICIELS
  // -----------------------------
  const [adaverse] = await db
    .insert(adaProject)
    .values({ name: "Adaverse" })
    .returning();

  const [adaCheckEvent] = await db
    .insert(adaProject)
    .values({ name: "AdaCheckEvent" })
    .returning();

  const [adaction] = await db
    .insert(adaProject)
    .values({ name: "Adaction" })
    .returning();

  const [adaopte] = await db
    .insert(adaProject)
    .values({ name: "Adaopte" })
    .returning();

  const [dataviz] = await db
    .insert(adaProject)
    .values({ name: "Paris Dataviz" })
    .returning();

  const [quiz] = await db
    .insert(adaProject)
    .values({ name: "Ada Quiz" })
    .returning();

  const [onboarding] = await db
    .insert(adaProject)
    .values({ name: "Onboarding" })
    .returning();

  // Ajout FATOMATA
  const [phpProject] = await db
    .insert(adaProject)
    .values({ name: "Projet PHP" })
    .returning();

  const [extensionProject] = await db
    .insert(adaProject)
    .values({ name: "Extension Navigateur" })
    .returning();

  // -----------------------------
  // 3) REPOS FRIDA
  // -----------------------------
  const fridaRepos = [

    // ADAVERSE ----------------------------------------------------
    { slug: "frida-adaverse-Mamoru-fr", title: "Adaverse – Mamoru", url: "https://github.com/adatechschool/frida-adaverse-Mamoru-fr", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-PEYREGuillaume34", title: "Adaverse – PEYREGuillaume34", url: "https://github.com/adatechschool/frida-adaverse-PEYREGuillaume34", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-Niouk971", title: "Adaverse – Niouk971", url: "https://github.com/adatechschool/frida-adaverse-Niouk971", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-VincentComier", title: "Adaverse – VincentComier", url: "https://github.com/adatechschool/frida-adaverse-VincentComier", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-Xinzhu99", title: "Adaverse – Xinzhu99", url: "https://github.com/adatechschool/frida-adaverse-Xinzhu99", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-Samir3200", title: "Adaverse – Samir3200", url: "https://github.com/adatechschool/frida-adaverse-Samir3200", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-Sosow20", title: "Adaverse – Sosow20", url: "https://github.com/adatechschool/frida-adaverse-Sosow20", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-Abdelcrks", title: "Adaverse – Abdelcrks", url: "https://github.com/adatechschool/frida-adaverse-Abdelcrks", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-meriemmehdi472-coder", title: "Adaverse – meriemmehdi472-coder", url: "https://github.com/adatechschool/frida-adaverse-meriemmehdi472-coder", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-FPrud", title: "Adaverse – FPrud", url: "https://github.com/adatechschool/frida-adaverse-FPrud", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-ulaeponon", title: "Adaverse – Ulaeponon", url: "https://github.com/adatechschool/frida-adaverse-ulaeponon", adaProjectId: adaverse.id },
    { slug: "frida-adaverse-Slim31000", title: "Adaverse – Slim31000", url: "https://github.com/adatechschool/frida-adaverse-Slim31000", adaProjectId: adaverse.id },

    // ADACHECKEVENT ----------------------------------------------------
    { slug: "frida-adaCheckEvent-Josephine-Sofia", title: "AdaCheckEvent – Joséphine & Sofia", url: "https://github.com/adatechschool/frida-adaCheckEvent-Josephine-Sofia", adaProjectId: adaCheckEvent.id },
    { slug: "frida-paris-projet-AdaCheckEvent--ursula_florian", title: "AdaCheckEvent – Ursula & Florian", url: "https://github.com/adatechschool/frida-paris-projet-AdaCheckEvent--ursula_florian", adaProjectId: adaCheckEvent.id },

    // ADACTION ----------------------------------------------------
    { slug: "frida-adaction-sophia_ursula_xinzhu", title: "Adaction – Sophia, Ursula & Xinzhu", url: "https://github.com/adatechschool/frida-adaction-sophia_ursula_xinzhu", adaProjectId: adaction.id },
    { slug: "frida-adaction-vincentirisguillaume", title: "Adaction – Vincent, Iris & Guillaume", url: "https://github.com/adatechschool/frida-adaction-vincentirisguillaume", adaProjectId: adaction.id },

    // ADAOPTE ----------------------------------------------------
    { slug: "frida-adaopte-adaence-Xinzhu99", title: "Adaopte – Adaence & Xinzhu99", url: "https://github.com/adatechschool/frida-adaopte-adaence-Xinzhu99", adaProjectId: adaopte.id },

    // DATAVIZ ----------------------------------------------------
    { slug: "frida-paris-dataviz-iris_xinzhu_abdel", title: "DataViz – Iris, Xinzhu & Abdel", url: "https://github.com/adatechschool/frida-paris-dataviz-iris_xinzhu_abdel", adaProjectId: dataviz.id },
    { slug: "frida-paris-dataviz-florian-meyko-matteo-1", title: "DataViz – Florian, Meyko & Matteo #1", url: "https://github.com/adatechschool/frida-paris-dataviz-florian-meyko-matteo-1", adaProjectId: dataviz.id },
    { slug: "frida-paris-dataviz-sofia-samir-salem", title: "DataViz – Sofia, Samir & Salem", url: "https://github.com/adatechschool/frida-paris-dataviz-sofia-samir-salem", adaProjectId: dataviz.id },
    { slug: "frida-paris-dataviz-josephine-vincent-nasra", title: "DataViz – Joséphine, Vincent & Nasra", url: "https://github.com/adatechschool/frida-paris-dataviz-josephine-vincent-nasra", adaProjectId: dataviz.id },
    { slug: "frida-paris-dataviz-projet-api-felix_ursula_guillaume", title: "DataViz API – Felix, Ursula & Guillaume", url: "https://github.com/adatechschool/frida-paris-dataviz-projet-api-felix_ursula_guillaume", adaProjectId: dataviz.id },
    { slug: "frida-paris-dataviz-florian-meyko-matteo", title: "DataViz – Florian, Meyko & Matteo", url: "https://github.com/adatechschool/frida-paris-dataviz-florian-meyko-matteo", adaProjectId: dataviz.id },

    // QUIZ ----------------------------------------------------
    { slug: "frida-quiz-jofexin", title: "Quiz – Jofexin", url: "https://github.com/adatechschool/frida-quiz-jofexin", adaProjectId: quiz.id },
    { slug: "frida-quiz-quizz_ursula-matteo-et-samir", title: "Quiz – Ursula, Matteo & Samir", url: "https://github.com/adatechschool/frida-quiz-quizz_ursula-matteo-et-samir", adaProjectId: quiz.id },
    { slug: "frida-quiz-vincent_iris_guillaume", title: "Quiz – Vincent, Iris & Guillaume", url: "https://github.com/adatechschool/frida-quiz-vincent_iris_guillaume", adaProjectId: quiz.id },
    { slug: "frida-quiz-sofia_salem_florian", title: "Quiz – Sofia, Salem & Florian", url: "https://github.com/adatechschool/frida-quiz-sofia_salem_florian", adaProjectId: quiz.id },
    { slug: "frida-quiz-meyko-nasra-abdel", title: "Quiz – Meyko, Nasra & Abdel", url: "https://github.com/adatechschool/frida-quiz-meyko-nasra-abdel", adaProjectId: quiz.id },

    // ONBOARDING ----------------------------------------------------
    { slug: "frida_onboarding_correction", title: "Onboarding – Correction", url: "https://github.com/adatechschool/frida_onboarding_correction", adaProjectId: onboarding.id },
  ];

  // -----------------------------
  // 4) REPOS FATOMATA
  // -----------------------------
  const fatomataRepos = [
    // PHP
    { slug: "projet-collectif-nantes-projet-php-dmpg", title: "Projet PHP – DMPG", url: "https://github.com/adatechschool/projet-collectif-nantes-projet-php-dmpg", adaProjectId: phpProject.id },
    { slug: "projet-collectif-nantes-projet-php-chasebflo", title: "Projet PHP – Chasebflo", url: "https://github.com/adatechschool/projet-collectif-nantes-projet-php-chasebflo", adaProjectId: phpProject.id },
    { slug: "projet-collectif-nantes-projet-php-dec-s", title: "Projet PHP – dec-s", url: "https://github.com/adatechschool/projet-collectif-nantes-projet-php-dec-s", adaProjectId: phpProject.id },
    { slug: "projet-collectif-nantes-projet-php-taf", title: "Projet PHP – TAF", url: "https://github.com/adatechschool/projet-collectif-nantes-projet-php-taf", adaProjectId: phpProject.id },
    { slug: "ada-tech-school-fatoumata-kebe-nantes-projet-collectif-nantes-projet-php-Projet_Collectif_Template", title: "Projet PHP – Template", url: "https://github.com/adatechschool/ada-tech-school-fatoumata-kebe-nantes-projet-collectif-nantes-projet-php-Projet_Collectif_Template", adaProjectId: phpProject.id },

    // EXTENSION NAVIGATEUR
    { slug: "projet-collectif-nantes-extension-navigateur-macteam", title: "Extension Navigateur – MACTeam", url: "https://github.com/adatechschool/projet-collectif-nantes-extension-navigateur-macteam", adaProjectId: extensionProject.id },
    { slug: "projet-collectif-nantes-extension-navigateur-ssfd", title: "Extension Navigateur – SSFD", url: "https://github.com/adatechschool/projet-collectif-nantes-extension-navigateur-ssfd", adaProjectId: extensionProject.id },
    { slug: "projet-collectif-nantes-extension-navigateur-dgct", title: "Extension Navigateur – DGCT", url: "https://github.com/adatechschool/projet-collectif-nantes-extension-navigateur-dgct", adaProjectId: extensionProject.id },
    { slug: "projet-collectif-nantes-extension-navigateur-peef-team", title: "Extension Navigateur – PEEF Team", url: "https://github.com/adatechschool/projet-collectif-nantes-extension-navigateur-peef-team", adaProjectId: extensionProject.id },
    { slug: "ada-tech-school-fatoumata-kebe-nantes-projet-collectif-nantes-extension-navigateur-Projet_Collecti-1", title: "Extension Navigateur – Projet Collectif 1", url: "https://github.com/adatechschool/ada-tech-school-fatoumata-kebe-nantes-projet-collectif-nantes-extension-navigateur-Projet_Collecti-1", adaProjectId: extensionProject.id },
    { slug: "ada-tech-school-fatoumata-kebe-nantes-projet-collectif-nantes-extension-navigateur-Projet_Collectif_", title: "Extension Navigateur – Template", url: "https://github.com/adatechschool/ada-tech-school-fatoumata-kebe-nantes-projet-collectif-nantes-extension-navigateur-Projet_Collectif_", adaProjectId: extensionProject.id },

    { slug: "projet-collectif-extension-de-navigateur-amina-fatoumata-ileana", title: "Extension – Amina, Fatoumata & Ileana", url: "https://github.com/adatechschool/projet-collectif-extension-de-navigateur-amina-fatoumata-ileana", adaProjectId: extensionProject.id },
  ];

  // -----------------------------
  // 5) INSERTIONS
  // -----------------------------
  for (const repo of fridaRepos) {
    await db.insert(studentProjects).values({
      title: repo.title,
      slug: repo.slug,
      githubUrl: repo.url,
      illustrationUrl: null,
      demoUrl: null,
      adaProjectId: repo.adaProjectId,
      promotionId: frida.id,
    });
  }

  for (const repo of fatomataRepos) {
    await db.insert(studentProjects).values({
      title: repo.title,
      slug: repo.slug,
      githubUrl: repo.url,
      illustrationUrl: null,
      demoUrl: null,
      adaProjectId: repo.adaProjectId,
      promotionId: fatomata.id,
    });
  }

  console.log("🌱 Seed terminé pour FRIDA + FATOMATA ✔️");
}

main()
