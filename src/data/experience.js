export const experience = [
  {
    company: "DeltaX",
    role: "Software Engineer",
    duration: "Feb 2024 – June 2026",
    description:
      "Full-stack engineer at an ad-tech startup. Built across backend (.NET Core, SQL Server), mobile (Flutter, Riverpod), and infra (Docker, Kubernetes, Jenkins) — owning features from architecture through production support.",
    bullets: [
      "Optimized a SQL Server stored procedure from 6 s → 0.28 s on 667K+ rows; the approach was adopted company-wide",
      "Led a Redis → DragonflyDB migration across 7 production services, improving cache throughput and reducing infra cost",
      "Solo-built an LLM-powered WhatsApp message processor — RabbitMQ pipeline, OpenAI/vLLM inference, validation-and-retry loop for structured output reliability",
      "Set up the pre-production environment from scratch: Docker, Kubernetes, and Jenkins CI/CD pipelines across multiple products",
      "Built a macro-substitution campaign launcher: Vue.js frontend, background job processor, email and WhatsApp delivery",
      "Migrated 8 Flutter modules from Provider to Riverpod, establishing a consistent state architecture across the mobile codebase",
    ],
    technologies: [
      ".NET Core", "C#", "SQL Server", "Flutter", "Dart", "Riverpod",
      "Vue.js", "Docker", "Kubernetes", "Jenkins", "RabbitMQ", "DragonflyDB", "Redis",
    ],
  },
  {
    company: "Bewingz",
    role: "Mobile Intern",
    duration: "Feb 2023 – Feb 2024",
    description:
      "Solo-built a mobile companion app for real-time e-bike monitoring and maintenance scheduling at an e-vehicle startup.",
    bullets: [
      "Built the app from scratch in Flutter with Firebase (Firestore, Realtime DB, Cloud Messaging)",
      "Integrated Google Location Services for live geotagging and location-based maintenance alerts",
      "Implemented Provider state management and a production-ready architecture",
    ],
    technologies: [
      "Flutter", "Dart", "Firebase", "Firestore", "Realtime DB",
      "Firebase Cloud Messaging", "Google Location Services", "Provider",
    ],
  },
];
