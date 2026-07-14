import linkboxImage from "../assets/portfolio_images/linkbox/logo.png";
import hangletImage from "../assets/portfolio_images/hanglet/logo.png";
import tomorrowImage from "../assets/portfolio_images/tomorrow/thumbnail.png";
import bewingzImage from "../assets/portfolio_images/bewingz/bewingz.png";
import starWarsImage from "../assets/portfolio_images/star-wars-portfolio/home.png";
import clientPortfolioImage from "../assets/portfolio_images/tomorrow/mecorp-dark.svg";

export const projects = [
  {
    title: "LinkBox",
    category: "app",
    featured: true,
    description:
      "Link organizer app — users build themed collections (tools, resources, products) and share them publicly. Built solo, from idea to both stores.",
    tech: ["Flutter", "Dart", "Riverpod", "Firestore", "Isar", "Firebase Cloud Messaging"],
    image: linkboxImage,
    links: [
      { label: "Website", url: "https://linkbox.store/" },
      { label: "App Store", url: "https://apps.apple.com/in/app/linkbox-create-collect-share/id6737998565" },
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=apps.me.linkbox&hl=en_IN" },
    ],
    highlights: [
      "3,000+ users across App Store and Play Store — sole developer, designer, and release manager",
      "Offline-first local-first architecture: Isar for local persistence, Firestore for cloud sync — fully functional with no network connection",
      "Riverpod entity stores for normalized state; zero unnecessary rebuilds on unrelated data changes",
      "Firebase Cloud Messaging push re-engagement when followed collections receive new links",
      "Owned the full lifecycle: UX, architecture, development, App Store / Play Store submission, and analytics",
    ],
  },
  {
    title: "Tomorrow: Plan Tonight",
    category: "app",
    featured: true,
    description:
      "Evening planning app — map out your next day the night before to wake up with clarity instead of friction. Solo-built, live on both stores.",
    tech: ["Flutter", "Dart", "Firebase"],
    image: tomorrowImage,
    links: [
      { label: "App Store", url: "https://apps.apple.com/in/app/tomorrow-plan-tonight/id6760284245" },
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=apps.me.tomorrow&hl=en_IN" },
      { label: "Website", url: "https://me-corp.github.io/tomorrow-web/" },
    ],
    highlights: [
      "Solo-built and shipped to both App Store and Play Store",
      "Built with Flutter from scratch, end to end",
    ],
  },
  {
    title: "Hanglet",
    category: "client",
    featured: true,
    description:
      "Client project — hangout coordination app. Responsible for full mobile architecture and implementation. Confidential internals; architecture described below.",
    tech: ["Flutter", "Dart", "Riverpod", "Supabase", "PostgreSQL", "FCM", "pgvector", "Google Maps", "Google Places API", "OpenStreetMap"],
    image: hangletImage,
    links: [
      { label: "Website", url: "https://hanglet.com/" },
      { label: "Play Store (Testing)", url: "https://play.google.com/apps/testing/com.hanglet.hanglet" },
    ],
    highlights: [
      "Push notification architecture: FCM tokens, Supabase Edge Functions for triggers, pg_cron for scheduled batch delivery",
      "Normalized Riverpod entity-store architecture across the full app — single source of truth for each domain entity",
      "Face verification using pgvector similarity search on stored facial embeddings",
      "Dual map-provider integration (Google Maps + OpenStreetMap) with custom markers for browsing nearby hanglets on a live map view",
      "Google Places API-powered location search with autocomplete for picking a venue when creating an activity",
      "Supabase RLS security audit across all tables; resolved policy gaps before Play Store submission",
    ],
  },
  {
    title: "devclean",
    category: "tool",
    featured: true,
    description:
      "Open-source zsh CLI for developer machine cleanup. Safety-tiered operations that let you reclaim disk space without accidentally nuking something important.",
    tech: ["zsh", "Shell Scripting", "CLI"],
    image: "https://placehold.co/600x340/1a1a2e/ffffff?text=devclean",
    links: [
      { label: "GitHub", url: "https://github.com/HarshaVoleti/mac-dev-handbook" },
    ],
    highlights: [
      "Part of mac-dev-handbook — an opinionated toolkit for dev machine hygiene",
      "Safety-tiered: dry-run by default, explicit confirmation required before any destructive operation",
      "Targets common dev bloat: build caches, node_modules trees, Docker layer cache, Xcode DerivedData, Homebrew orphans",
    ],
  },
  {
    title: "Birdigo",
    category: "work",
    featured: false,
    description:
      "A CRM platform developed at DeltaX designed to manage leads, customer relationships, and business interactions across both B2B and B2C workflows. Contributed to backend development by building and maintaining REST APIs and database logic that power the system, supporting Flutter-based mobile applications and Vue.js web clients. Deployed using containerized infrastructure.",
    tech: ["Flutter", "Vue.js", ".NET", "SQL Server", "REST APIs", "Docker", "Kubernetes", "Redis"],
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/05/f2/54/05f2547c-2c0e-926e-d0ad-2447cef94b3d/Placeholder.mill/400x400bb-75.webp",
    links: [
      { label: "Website", url: "https://birdigo.com/" },
      { label: "Web App", url: "https://app.birdigo.com/" },
      { label: "iOS", url: "https://apps.apple.com/in/app/birdigo/id6450288826" },
      { label: "Android", url: "https://play.google.com/store/search?q=birdigo&c=apps&hl=en_IN" },
    ],
  },
  // {
  //   title: "RateMe",
  //   category: "app",
  //   featured: false,
  //   description:
  //     "A social rating and review system focused on trust and transparency. Unlike social media, it lets users share constructive feedback on skills and character, evolving into a credibility-driven platform where reputation matters more than followers.",
  //   tech: ["Flutter", "Firebase", "Firestore", "Firebase Authentication", "Firebase Cloud Messaging"],
  //   image: "https://placehold.co/600x340/1a1a2e/ffffff?text=RateMe",
  //   links: [],
  // },
  {
    title: "Bewingz",
    category: "work",
    featured: false,
    description:
      "A mobile application for tracking bike status, maintenance schedules, service history and check insights of your Bewingz e-bike.",
    tech: ["Flutter", "Firebase", "Firestore", "Firebase Authentication", "Firebase Cloud Messaging", "Firebase Storage", "Realtime Database"],
    image: bewingzImage,
    links: [{ label: "Website", url: "https://bewingz.com/" }],
  },
  {
    title: "Client Portfolio Websites",
    category: "client",
    featured: false,
    description:
      "Designed and developed personal portfolio websites for freelance clients to showcase their professional profiles, skills, and work experience with clean, modern layouts.",
    tech: ["Vue.js", "HTML", "CSS", "Netlify"],
    image: clientPortfolioImage,
    links: [
      { label: "Nikitha Pulineni", url: "https://nikithapulineni.netlify.app/" },
      { label: "Pareena Sayyad", url: "https://pareenasayyad.netlify.app/" },
    ],
    highlights: [
      "Designed responsive portfolio layouts optimized for desktop and mobile",
      "Implemented smooth UI interactions and clean section-based navigation",
      "Optimized website performance for fast loading",
      "Deployed and managed hosting through Netlify",
    ],
  },
  {
    title: "Star Wars Themed Portfolio",
    category: "experiment",
    featured: false,
    description:
      "A creative animated personal portfolio inspired by the Star Wars universe. Designed as an experimental UI project combining animations, themed visuals, and interactive effects.",
    tech: ["Vue 3", "JavaScript", "CSS Animations"],
    image: starWarsImage,
    links: [
      { label: "Website", url: "https://masterharshavoleti.netlify.app/" },
    ],
    highlights: [
      "Created custom space-themed animations and visual effects",
      "Built using Vue 3 with modular component architecture",
      "Designed interactive sections inspired by Star Wars aesthetics",
      "Explored creative UI design and animation techniques",
    ],
  },
];
