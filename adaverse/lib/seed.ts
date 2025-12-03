import { db } from "./db/drizzle";
import { eq } from "drizzle-orm"
import { adaPromo, adaProject, studentProjects } from "./db/schema";

async function main() {
 
  const [frida] = await db
    .insert(adaPromo)
    .values({
      name: "Frida",
      startDate: "2024-09-01",
    })
    .returning();

  
  const [checkEvents] = await db
    .insert(adaProject)
    .values({ name: "CheckEvents" })
    .returning();

  const [dataviz] = await db
    .insert(adaProject)
    .values({ name: "Dataviz" })
    .returning();

  const [quizz] = await db
    .insert(adaProject)
    .values({ name: "Quizz" })
    .returning();

  const [adaction] = await db
    .insert(adaProject)
    .values({ name: "Adaction" })
    .returning();

  const [adaverse] = await db
    .insert(adaProject)
    .values({ name: "Adaverse" })
    .returning();

 

  const fridaRepos = [

    // CHECKEVENTS -----------------------------
    {
      slug: "FPrud-Panam-Events",
      title: "Panam'Events",
      url: "https://github.com/FPrud/Panam-Events",
      demo: "https://panamevents-adatechschool.vercel.app/",
      adaProjectId: checkEvents.id
    },
    {
      slug: "PEYREGuillaume34-AdaCheck-Event",
      title: "AdacheckEvent",
      url: "https://github.com/PEYREGuillaume34/AdaCheck-Event",
      demo: "https://panamevents-adatechschool.vercel.app/",
      adaProjectId: checkEvents.id
    },
    {
      slug: "vincent-yannick-checkevents",
      title: "CheckEvents – Vincent & Yannick",
      url: "https://github.com/ValotKzm/vercel_adacheck_vc_ys",
      demo: "https://verceladacheckvcys.vercel.app/",
      adaProjectId: checkEvents.id
    },
    {
      slug: "samir-alexis-checkevents",
      title: "CheckEvents – Samir & Alexis",
      url: "https://github.com/Samir3200/AdaCheckEvent-Alexis-Samir",
      demo: "https://ada-check-event-alexis-samir.vercel.app/",
      adaProjectId: checkEvents.id
    },
    {
      slug: "josephine-sofia-checkevents",
      title: "CheckEvents – Joséphine & Sofia",
      url: "https://github.com/Sosow20/AdaCheckEvent_project",
      demo: "https://fridaadacheckeventproject.vercel.app/",
      adaProjectId: checkEvents.id
    },

    // DATAVIZ -----------------------------
    {
      slug: "FPrud-CineDuCoin",
      title: "CineDuCoin",
      url: "https://github.com/FPrud/CineDuCoin",
      demo: "https://cineducoinadatechschool.vercel.app/",
      adaProjectId: dataviz.id
    },
    {
      slug: "sofia-samir-salem-dataviz",
      title: "OpenFoodFacts Api / Scanner produit",
      url: "https://github.com/adatechschool/frida-paris-dataviz-sofia-samir-salem",
      demo: "https://fridadatavizproject.vercel.app/",
      adaProjectId: dataviz.id
    },

    // QUIZZ -----------------------------
    {
      slug: "PEYREGuillaume34-Quiz",
      title: "QuizOiseaux",
      url: "https://github.com/PEYREGuillaume34/Quiz",
      demo: "https://quiz-ten-eosin.vercel.app/",
      adaProjectId: quizz.id
    },
    {
      slug: "sofia-salem-florian-quizz",
      title: "Quizz – Sofia, Salem & Florian",
      url: "https://github.com/adatechschool/sofia-salem-florian-quizz",
      demo: null,
      adaProjectId: quizz.id
    },
    {
      slug: "xinzhu-felix-josephine-quizz",
      title: "Quizz – Xinzhu, Félix & Joséphine",
      url: "https://github.com/Xinzhu99/Quiz_Frida",
      demo: "https://quiwfrida.vercel.app/",
      adaProjectId: quizz.id
    },

    // ADACTION -----------------------------
    {
      slug: "vincent-iris-guillaume-adaction",
      title: "Adaction – Vincent, Iris & Guillaume",
      url: "https://github.com/adatechschool/frida-adaction-vincentirisguillaume",
      demo: null,
      adaProjectId: adaction.id
    },

    // ADAVERSE -----------------------------
    {
      slug: "adaverse-alexis",
      title: "Adaverse – Alexis",
      url: "https://github.com/adatechschool/frida-adaverse-alexis",
      demo: "https://frida-adaverse-mamoru-fr.vercel.app/",
      adaProjectId: adaverse.id
    },

  ];

  async function makeRawThumbnail(url: string | null): Promise<string | null> {
  if (!url) return null;

  // extraire owner / repo
  const parts = url.replace("https://github.com/", "").split("/");
  const user = parts[0];
  const repo = parts[1];

  const rawUrl = `https://raw.githubusercontent.com/${user}/${repo}/main/thumbnail.png`;

  try {
    const res = await fetch(rawUrl, { method: "HEAD" });

    if (res.ok) {
      return rawUrl;     
    } else {
      return null;        
    }
  } catch (e) {
    return null;          
  }
}



 
  for (const repo of fridaRepos) {
    await db.insert(studentProjects).values({
      title: repo.title,
      slug: repo.slug,
      githubUrl: repo.url,
      demoUrl: repo.demo,
      illustrationUrl: await makeRawThumbnail(repo.url),
      adaProjectId: repo.adaProjectId,
      promotionId: frida.id,
    });
  }
  await db
    .update(studentProjects)
    .set({
      publishedAt: new Date("2024-11-01T10:00:00Z"),
    })
    .where(eq(studentProjects.slug, "FPrud-Panam-Events"));

  await db
    .update(studentProjects)
    .set({
      publishedAt: new Date("2024-11-05T10:00:00Z"),
    })
    .where(eq(studentProjects.slug, "FPrud-CineDuCoin"));

  await db
    .update(studentProjects)
    .set({
      publishedAt: new Date("2024-11-10T10:00:00Z"),
    })
    .where(eq(studentProjects.slug, "PEYREGuillaume34-Quiz"));


  console.log("🌱 Seed FRIDA généré ✔️");
}

main();
