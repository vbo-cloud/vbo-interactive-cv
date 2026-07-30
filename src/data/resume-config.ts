import type { ResumeConfig } from './types'

export const resumeConfig: ResumeConfig = {
  // ===== PERSONAL INFO =====
  personal: {
    name: 'Vincent Boutin',
    // Pinned explicitly: public/images/ also holds FullImage.png (PDF hero preview) and
    // Thumbnail.png, which would otherwise confuse the auto-detection in vite-plugin-assets-detect.ts
    photo: '/images/photo.jpg',
    photoBackEmoji: '🎮',
    title: {
      en: 'DevOps / Cloud Engineer (Azure)',
      fr: 'DevOps / Cloud Engineer (Azure)',
    },
    tagline: {
      en: 'AI Automation & Orchestration',
      fr: 'Automatisation et Orchestration IA',
    },
    subtitle: {
      en: 'From game development to cloud engineering',
      fr: "Du développement de jeux vidéo à l'ingénierie cloud",
    },
    location: 'Annemasse',
  },

  // ===== SEO (used in <head> meta tags) =====
  seo: {
    title: 'Vincent Boutin - Cloud Engineer (Azure)',
    description:
      'Interactive resume of Vincent Boutin, Cloud Engineer (Azure), AZ-104 certified, with a background in VR/game development (Unity, Unreal, C#/C++).',
  },

  // ===== LANGUAGES =====
  languages: {
    default: 'fr',
    available: ['fr', 'en'],
    labels: {
      en: 'EN',
      fr: 'FR',
    },
  },

  // ===== CONTACT =====
  contact: [
    { type: 'linkedin', label: 'Vincent BOUTIN', href: 'https://linkedin.com/in/vincent-boutin/' },
    { type: 'email', label: 'contact@vincentboutin.dev' },
    { type: 'website', label: 'Portfolio', href: 'https://vincentboutin.dev' },
    { type: 'location', label: 'Annemasse' },
  ],

  // ===== REFERENTS =====
  referents: [
    {
      name: 'Samy-Adrien FOUDIL - EDF',
      href: 'https://www.linkedin.com/in/sfoudil/',
      title: {
        en: 'MLOps AWS | Fullstack Python Developer',
        fr: 'MLOps AWS | Développeur Python Fullstack',
      },
    },
    {
      name: 'Cédric BEMATOL - LS GROUP',
      href: 'https://www.linkedin.com/in/cedric-bematol/',
      title: {
        en: 'Senior Software Engineer',
        fr: 'Senior Software Engineer',
      },
    },
  ],

  // ===== SKILLS =====
  skills: [
    {
      title: { en: 'Cloud', fr: 'Cloud' },
      type: 'badges',
      items: [{ name: 'Azure' }, { name: 'Terraform' }],
    },
    {
      title: { en: 'Code', fr: 'Code' },
      type: 'badges',
      items: [{ name: 'C#' }, { name: 'C++' }, { name: 'Python' }],
    },
    {
      title: { en: 'Backend', fr: 'Backend' },
      type: 'badges',
      items: [
        { name: 'FastAPI' },
        { name: 'PostgreSQL' },
        { name: 'pgvector' },
        { name: 'Service Bus' },
      ],
    },
    {
      title: { en: 'AI', fr: 'IA' },
      type: 'badges',
      items: [{ name: 'OpenAI' }, { name: 'Claude' }],
    },
    {
      title: { en: 'Workflow', fr: 'Workflow' },
      type: 'badges',
      items: [
        { name: 'Git' },
        { name: 'CI/CD' },
        { name: 'Docker' },
        { name: { en: 'Agile Methods', fr: 'Méthodes Agiles' } },
      ],
    },
    {
      title: { en: 'Engine', fr: 'Moteurs' },
      type: 'badges',
      items: [{ name: 'Unity' }, { name: 'Unreal' }],
    },
  ],

  // ===== PROFESSIONAL EXPERIENCES =====
  experiences: [
    {
      id: 'job-finder',
      company: { en: 'Job Finder', fr: 'Job Finder' },
      role: { en: 'Cloud Engineer (Azure)', fr: 'Cloud Engineer (Azure)' },
      type: { en: 'Independent project', fr: 'Projet indépendant' },
      period: { en: '09/2025 - Present', fr: '09/2025 - Présent' },
      description: {
        en: 'Design, deployment and day-to-day operation of a complete cloud platform on Azure. Job Finder automates job offer sourcing and profile matching. The platform is publicly available and I keep it running in production.',
        fr: "Conception, déploiement et exploitation d'une plateforme cloud complète sur Azure. Job Finder automatise la veille d'offres d'emploi et la mise en correspondance avec un profil. La plateforme est accessible publiquement et j'en assure le maintien en condition opérationnelle.",
      },
      techs: [
        'Azure',
        'Terraform',
        'Python',
        'FastAPI',
        'PostgreSQL',
        'pgvector',
        'OpenAI',
        'Claude',
        'Service Bus',
        'Next.js',
        'CI/CD',
        'GitHub',
        'Docker',
        'PostHog',
      ],
      isHighlighted: true,
      details: {
        tasks: {
          en: [
            'Orchestrated an AI-assisted development workflow: two Claude roles with separate permissions (Claude Cowork read-only for design and planning, Claude Code for feature implementation), several Claude Code agents working in parallel, each isolated in its own git worktree, hooks and skills enforcing the project conventions and git workflow, and dedicated subagents for code review, documentation and code exploration',
            'Designed an Azure landing zone (networking, identity, governance) carrying a modular application layer, with reusable Terraform modules (network, compute, data, AI, messaging, monitoring)',
            'CI/CD with GitHub Actions: Terraform plan, unit tests and a Claude review on every PR, Terraform apply and Docker image build/push on merge',
            'Designed a Python multi-agent pipeline (offer-fetching, cv-analysis, matching, cv-review, notifications, cleanup) orchestrated via Azure Service Bus and Container App Jobs',
            'Semantic matching through embeddings then vector distance (pgvector), CV and job offer analysis with Azure OpenAI',
            'Designed a FastAPI backend (JWT auth via Microsoft Entra External ID) and a Next.js 14 frontend, secured end-to-end with private networking (VNet, private endpoints/DNS), Key Vault, least-privilege RBAC and managed/workload identity',
            'Observability with Application Insights, Log Analytics and a Grafana dashboard, Azure Monitor alerts on job failures and Service Bus queues, a monthly Azure budget with alerts, and product analytics through PostHog',
          ],
          fr: [
            "Mise en place d'un workflow de développement assisté par agents IA : deux rôles Claude aux permissions séparées (Claude Cowork en lecture seule pour la conception et la planification, Claude Code pour l'implémentation des features), plusieurs agents Claude Code travaillant en parallèle, chacun isolé sur son propre worktree git, hooks et skills pour faire respecter les conventions et le workflow git, et des subagents dédiés à la revue de code, à la documentation et à l'exploration du code",
            "Conception d'une landing zone Azure (réseau, identité, gouvernance) portant une couche applicative modulaire, avec des modules Terraform réutilisables (réseau, compute, data, IA, messagerie, monitoring)",
            "Mise en place d'une CI/CD avec GitHub Actions : Terraform plan, tests unitaires et review Claude à chaque PR, Terraform apply et build/push des images Docker au merge",
            "Conception d'un pipeline multi-agents Python (collecte d'offres, analyse de CV, matching, revue de CV, notifications, nettoyage) orchestré via Azure Service Bus et des Container App Jobs",
            "Matching sémantique par embeddings puis distance vectorielle (pgvector), analyse de CV et des offres avec Azure OpenAI",
            "Conception d'un backend FastAPI (authentification JWT via Microsoft Entra External ID) et d'un frontend Next.js 14, sécurisés de bout en bout : VNet avec endpoints/DNS privés, Key Vault, RBAC au moindre privilège, identité managée/workload",
            "Observabilité avec Application Insights, Log Analytics et un dashboard Grafana, alertes Azure Monitor sur les échecs de jobs et les files Service Bus, budget mensuel Azure alerté, et analytics produit via PostHog",
          ],
        },
        projectLink: {
          label: { en: 'Project:', fr: 'Projet :' },
          url: 'https://jobfinder.vincentboutin.dev',
        },
      },
    },
    {
      id: 'akanea',
      company: { en: 'Akanea', fr: 'Akanea' },
      role: { en: 'C# Developer', fr: 'Développeur C#' },
      type: { en: 'Permanent', fr: 'CDI' },
      period: { en: '09/2025 - 05/2025', fr: '09/2025 - 05/2025' },
      description: {
        en: 'Developed new features and fixed bugs on a transport management application (C#, Oracle Database), contributing to an internal framework and a hybrid client/web application.',
        fr: 'Développement de nouvelles fonctionnalités et correction de bugs sur une application de gestion de transport (C#, Oracle Database), avec contribution à un framework interne et à une application hybride client/web.',
      },
      techs: ['C#', 'Oracle Database', 'Azure DevOps'],
      details: {
        tasks: {
          en: [
            'Contributed to architecture improvements and Gitflow processes on Azure DevOps',
            'Contributed to the development of an internal framework and a hybrid client/web application (3-tier architecture)',
          ],
          fr: [
            "Contribution à l'amélioration de l'architecture et aux processus Gitflow sur Azure DevOps",
            "Contribution au développement d'un framework interne et d'une application hybride client/web (architecture 3-tier)",
          ],
        },
      },
    },
    {
      id: 'ls-group',
      company: { en: 'LS Group', fr: 'LS Group' },
      role: { en: 'VR Developer', fr: 'Développeur VR' },
      type: { en: 'Work-study program', fr: 'Alternance' },
      period: { en: '09/2024 - 09/2022', fr: '09/2024 - 09/2022' },
      description: {
        en: 'Work-study program at LS Group (Suresnes), within the XR Twin team: developed and enhanced a VR/AR industrial visualization app on Unity, built with CEA for clients including Airbus, Dassault Aviation, Renault and Stellantis.',
        fr: "Alternance chez LS Group (Suresnes), au sein de l'équipe XR Twin : développement et amélioration d'une application de visualisation industrielle VR/AR sur Unity, réalisée avec le CEA pour des clients comme Airbus, Dassault Aviation, Renault et Stellantis.",
      },
      techs: ['Unity', 'C#', 'Netcode', 'GitLab', 'CI/CD', 'Agile Methods'],
      details: {
        tasks: {
          en: [
            'Designed and rebuilt the navigation system from scratch on Unity\'s Input System, with swappable presets matching Unity, Catia, SolidWorks, Inventor, Revit and SketchUp, plus a distance-adaptive "focus" camera',
            'Teamed with a colleague to profile Save/Load performance with Superluminal and fix ~15 issues, cutting project load times by 50-70%',
            'Owned the front-end of a Netcode-based multiplayer feature (session create/join, lobby, chat) while a teammate built the backend',
            'Centralized a fragmented color system into an ID-based "Tint" architecture, turning light/dark theming into a config change',
            'Fixed an architecture violation in the Copy/Paste system and a cluster of Inspector/Hierarchy UX bugs, reviewed by the tech lead',
            'Worked with GitFlow and CI/CD, contributing within Agile (Scrum/Kanban) teams',
          ],
          fr: [
            "Conception et refonte complète du système de navigation sur l'Input System de Unity, avec des presets interchangeables compatibles Unity, Catia, SolidWorks, Inventor, Revit et SketchUp, plus une caméra \"focus\" adaptative à la distance",
            "Profilage des performances Save/Load avec un collègue via Superluminal, correction d'une quinzaine de problèmes, réduction des temps de chargement de 50 à 70%",
            "Développement du front-end d'une fonctionnalité multijoueur basée sur Netcode (création/connexion de session, lobby, chat) pendant qu'un collègue développait le backend",
            'Centralisation d\'un système de couleurs fragmenté en une architecture "Tint" par ID, transformant le passage clair/sombre en simple configuration',
            "Correction d'une violation d'architecture dans le système Copy/Paste et d'un ensemble de bugs UX Inspector/Hierarchy, revus par le tech lead",
            'Travail avec GitFlow et CI/CD, au sein d\'équipes Agile (Scrum/Kanban)',
          ],
        },
      },
    },
    {
      id: 'reality-academy',
      company: { en: 'Reality Academy', fr: 'Reality Academy' },
      role: { en: 'QA Tester / Tool Programmer', fr: 'QA Tester / Tool Programmer' },
      type: { en: 'Internship', fr: 'Stage' },
      period: { en: '08/2022 - 02/2022', fr: '08/2022 - 02/2022' },
      description: {
        en: 'Internship at Reality Academy (Bagnolet): designed tools and contributed to QA for a VR e-learning SaaS platform and training catalog, plus client projects for sister studio Reality Agency (Givenchy, Chanel, Nespresso).',
        fr: "Stage chez Reality Academy (Bagnolet) : conception d'outils et contribution à la QA pour une plateforme SaaS et un catalogue de formations VR e-learning, ainsi que des projets clients pour la division sœur Reality Agency (Givenchy, Chanel, Nespresso).",
      },
      techs: ['Unity', 'C#', 'AR', 'GitHub'],
      details: {
        tasks: {
          en: [
            'Built a 250+ item test/acceptance checklist (cahier de recette) validated across 4 VR headsets (Pico G2 4K, Pico Neo 3, Oculus Quest, HTC Vive) before every production release',
            'Designed and built a custom node-based Behavior Tree editor (Unity UI Builder) to untangle scattered VR training logic into a single clear timeline',
            'Wrote a tool to play 360° training videos at up to 5x speed and moved most QA out of the headset into a custom Editor Mode, cutting re-test time dramatically',
            'Built a camera-relative object-placement tool for positioning objects in 360° scenes with no spatial landmarks',
            "Shipped Andra's VR safety experience and built an AR video-playback feature plus an automated asset-photography tool for Wimbledon, as client projects for Reality Agency",
          ],
          fr: [
            'Mise en place d\'un cahier de recette de plus de 250 items, validé sur 4 casques VR (Pico G2 4K, Pico Neo 3, Oculus Quest, HTC Vive) avant chaque mise en production',
            "Conception et développement d'un éditeur de Behavior Tree par nœuds (Unity UI Builder) pour remettre à plat une logique de formation VR jusque-là éclatée en une timeline unique et claire",
            'Développement d\'un outil de lecture des vidéos de formation à 360° jusqu\'à 5x la vitesse normale, et déplacement de l\'essentiel de la QA hors casque via un Editor Mode dédié, réduisant fortement le temps de re-test',
            "Développement d'un outil de placement d'objets relatif à la caméra pour positionner des éléments dans des scènes 360° sans repère spatial",
            "Livraison de l'expérience VR de sécurité Andra, et développement d'une fonctionnalité vidéo AR ainsi que d'un outil de photographie d'assets automatisé pour Wimbledon, en tant que projets clients pour Reality Agency",
          ],
        },
      },
    },
    {
      id: 'iim-student-projects',
      company: { en: 'IIM', fr: 'IIM' },
      role: { en: 'Student Projects', fr: 'Projets étudiants' },
      type: { en: 'Studies', fr: 'Études' },
      period: { en: '09/2024 - 09/2019', fr: '09/2024 - 09/2019' },
      description: {
        en: 'Student projects for the Game Programming curriculum at IIM (Paris La Défense), solo and in teams: gameplay systems, AI and networking in Unity, Unreal and custom C++ network engines.',
        fr: "Projets étudiants du cursus Game Programming à l'IIM (Paris La Défense), en solo et en équipe : systèmes de gameplay, IA et réseau sur Unity, Unreal et moteurs réseau custom en C++.",
      },
      techs: ['Unity', 'Unreal', 'C#', 'C++', 'GitHub', 'GitLab', 'Agile Methods'],
      details: {
        tasks: {
          en: [
            'Dwarfs Delight, 6 weeks, 13 people:\nLead Programmer on this local multiplayer couch game for 2-4 players, selected by IIM for the Pégases awards and published on Steam',
            "Xenos Heresy, 1 month, 6 people:\nDesigned a tool for game designers to easily use a teammate's tile-selection algorithm (attack type, range, etc.), and designed the game's architecture (turn-based system, AI for the different monsters, player-monster interactions, art implementation, level selection, tutorial...), published on the Play Store",
            'Online FPS, 3 weeks, 2 people:\nBuilt a custom C++/Enet network architecture (client-side prediction, server reconciliation, server-authoritative physics), plus a similar architecture for an online multiplayer Snake',
            "Procedural Dungeon Generation, 2 weeks, 2 people:\nAdapted Dwarfs Delight into a procedurally generated dungeon crawler, reworking its architecture around my teammate's floor-generation algorithm (room chaining, doors, room types), and building the room prefabs, their variety and associated content (controls, level design). Added an ability-unlock gate between floors",
            'Provided pedagogical support to classmates on coding problems and code reviews',
          ],
          fr: [
            "Dwarfs Delight, 6 semaines, 13 personnes :\nLead Programmer sur ce jeu multijoueur local pour 2 à 4 joueurs, sélectionné par l'IIM pour les Pégases et publié sur Steam",
            "Xenos Heresy, 1 mois, 6 personnes :\nConception d'un outil dédié aux game designers pour exploiter facilement l'algorithme de sélection de cases d'un camarade (type d'attaque, portée, etc.), et conception de l'architecture du jeu (système tour par tour, IA des différents monstres, interaction entre joueurs et monstres, implémentation de l'art, sélection des différents niveaux, tutoriel...), publié sur le Play Store",
            "Online FPS, 3 semaines, 2 personnes :\nDéveloppement d'une architecture réseau C++/Enet (prédiction côté client, réconciliation serveur, physique faisant autorité côté serveur), ainsi qu'une architecture similaire pour un Snake multijoueur en ligne",
            "Procedural Dungeon Generation, 2 semaines, 2 personnes :\nAdaptation de Dwarfs Delight en un dungeon crawler à génération procédurale, refonte de son architecture autour de l'algorithme de génération d'étages de mon camarade (enchaînement des salles, portes, types de salles), et création des prefabs de salles, de leur diversité et du contenu associé (contrôles, level design). Ajout d'un système de déblocage de capacité conditionnant le passage à l'étage suivant",
            "Accompagnement pédagogique de camarades de classe sur des problèmes de code et des revues de code",
          ],
        },
      },
    },
  ],

  // ===== EDUCATION =====
  education: [
    {
      school: { en: 'Microsoft', fr: 'Microsoft' },
      degree: { en: 'AZ-104 Certification', fr: 'Certification AZ-104' },
      specialty: {
        en: 'Azure, Virtual Machines, Networking, Storage, Identity (Azure AD), RBAC, Monitoring, Security, Backup & Recovery, Governance, Azure CLI / PowerShell, ARM templates, Bicep',
        fr: 'Azure, Machines Virtuelles, Réseau, Stockage, Identité (Azure AD), RBAC, Supervision, Sécurité, Sauvegarde & Restauration, Gouvernance, Azure CLI / PowerShell, ARM templates, Bicep',
      },
      period: '2026',
    },
    {
      school: { en: 'IIM, Courbevoie', fr: 'IIM, Courbevoie' },
      degree: { en: "Master's Degree in Game Programming", fr: 'Master Game Programming' },
      specialty: {
        en: 'Unity, Unreal, C#, C++, OOP, 2D Mathematics, Algorithms, Integration, AI, Networking',
        fr: 'Unity, Unreal, C#, C++, POO, Mathématiques 2D, Algorithmique, Intégration, IA, Réseau',
      },
      period: '2024',
      badge: { en: 'Jury Honors', fr: 'Félicitations du Jury' },
    },
    {
      school: { en: 'UPEC, Créteil', fr: 'UPEC, Créteil' },
      degree: { en: "Bachelor's Degree in Sports Science (STAPS)", fr: 'Licence STAPS' },
      specialty: {
        en: 'Pedagogy, Group Coaching, Adaptability to Different Audiences, Active Listening, Empathy, Program Design (APA), Motivation & Engagement, Communication Skills, Safety Awareness',
        fr: "Pédagogie, Coaching de groupe, Adaptabilité à différents publics, Écoute active, Empathie, Conception de programmes (APA), Motivation & Engagement, Communication, Sensibilisation à la sécurité",
      },
      period: '2016',
    },
  ],

  // ===== VALUES =====
  values: [
    { en: 'Excellence', fr: 'Excellence' },
    { en: 'Continuous Improvement', fr: 'Amélioration continue' },
    { en: 'Knowledge Sharing', fr: 'Partage de connaissances' },
  ],

  // ===== HOBBIES =====
  hobbies: [
    {
      title: { en: 'Game Dev', fr: 'Dev Jeux Vidéo' },
      details: [
        { en: 'Game Jams', fr: 'Game Jams' },
        { en: 'Personal Projects', fr: 'Projets personnels' },
      ],
    },
    {
      title: { en: 'Sports', fr: 'Sport' },
      details: [
        { en: 'Strength Training', fr: 'Musculation' },
        { en: 'Climbing (Bouldering)', fr: 'Escalade (Bloc)' },
      ],
    },
    {
      title: { en: 'Music', fr: 'Musique' },
      details: [
        { en: 'Mixing', fr: 'Mix' },
        { en: 'Event Organization', fr: "Organisation d'événements" },
      ],
    },
  ],

  // ===== PDF (optional) =====
  // Auto-detected: just drop your PDF files in public/cv/fr/ and public/cv/en/
  // The download button will appear automatically — no config needed!

  // ===== THEME =====
  theme: {
    preset: 'minimal', // 'minimal' | 'warm' | 'ocean' | 'forest' | 'slate' | 'lilac'
    defaultMode: 'dark',
  },

  // ===== UI LABELS =====
  labels: {
    sections: {
      contact: { en: 'CONTACT', fr: 'CONTACT' },
      skills: { en: 'SKILLS', fr: 'COMPÉTENCES' },
      experience: { en: 'PROFESSIONAL EXPERIENCE', fr: 'EXPÉRIENCES PROFESSIONNELLES' },
      education: { en: 'EDUCATION', fr: 'FORMATION' },
      values: { en: 'VALUES', fr: 'VALEURS' },
      hobbies: { en: 'HOBBIES', fr: 'LOISIRS' },
      referent: { en: 'REFERENTS', fr: 'RÉFÉRENTS' },
    },
    experience: {
      mainTasks: { en: 'Main tasks:', fr: 'Tâches principales :' },
      moreTasks: { en: 'more tasks...', fr: 'autres tâches...' },
      training: { en: 'Training:', fr: 'Formations :' },
      technologies: { en: 'Technologies', fr: 'Technologies' },
    },
    actions: {
      clickHint: { en: 'Click on experiences to see more details', fr: 'Cliquez sur les expériences pour voir plus de détails' },
      switchTheme: { en: 'Toggle dark mode', fr: 'Changer le thème' },
      downloadPdf: { en: 'Download PDF', fr: 'Télécharger le PDF' },
      viewInteractive: { en: 'View the interactive resume', fr: 'Voir le CV interactif' },
    },
  },
}
