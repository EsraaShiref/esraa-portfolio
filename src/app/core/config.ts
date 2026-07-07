export const config = {
  developer: {
    name: 'Esraa',
    fullName: 'Esraa Ahmed Shiref',
    title: 'Full-Stack Developer',
    description:
      'Full-Stack Developer skilled in Angular, React Native and ASP.NET Core, with hands-on experience building scalable web and mobile applications. Passionate about integrating Generative AI into real-world solutions and delivering high-quality, user-focused products.',
  },
  social: {
    github: 'EsraaShiref',
    email: 'Israashiref@gmail.com',
    phone: '+20 102 949 6150',
    location: 'Cairo, Egypt',
  },
  about: {
    title: 'About Me',
    description:
      'I am a Full-Stack Developer from Cairo, Egypt, skilled in Angular, React Native, and ASP.NET Core. I hold a B.Sc. in Computers and Automatic Control Engineering from Tanta University (Excellent, 89.23%). I build scalable web and mobile applications end-to-end, from Angular 21 standalone-component frontends to ASP.NET Core APIs with real-time SignalR features. I am passionate about integrating Generative AI — including RAG-based assistants and LLM prompt engineering — into practical, user-focused products.',
  },
  experiences: [
    {
      position: 'Full-Stack Web & Gen AI Development (.NET) Intern',
      company: 'Information Technology Institute (ITI)',
      period: 'Jan 2026 - May 2026',
      location: 'Tanta, Egypt',
      description:
        'Intensive full-time training in ASP.NET Core, Web APIs, Entity Framework, and SQL Server, culminating in a graduation project as Frontend Lead and Backend Lead.',
      responsibilities: [
        'Intensive full-time training in ASP.NET Core, Web APIs, Entity Framework, and SQL Server',
        'Built real-world projects using modern frontend and backend technologies',
        'Applied Generative AI concepts including LLM integration and prompt engineering',
        'Served as Frontend Lead and Backend Lead for Harfi, a 5-developer graduation project',
      ],
      technologies: ['ASP.NET Core', 'Entity Framework', 'SQL Server', 'Angular 21', 'SignalR', 'RAG / LLM'],
    },
    {
      position: 'Frontend Mobile Developer',
      company: 'Camp Coding Academy',
      period: 'May 2021 - May 2022',
      location: 'Cairo, Egypt',
      description:
        'Developed cross-platform mobile apps using React Native with a focus on performance and scalability, collaborating in agile teams on real-world client projects.',
      responsibilities: [
        'Developed cross-platform mobile apps using React Native with focus on performance and scalability',
        'Integrated and consumed RESTful APIs to support dynamic app functionality',
        'Improved code quality by writing clean, maintainable, and reusable components',
        'Collaborated within agile teams on real-world client projects',
      ],
      technologies: ['React Native', 'JavaScript', 'REST APIs', 'Agile'],
    },
  ],
  education: {
    degree: 'B.Sc. in Computers and Automatic Control Engineering',
    school: 'Tanta University',
    period: '2020 - 2025',
    grade: 'Excellent (89.23%)',
    project:
      'Full-stack healthcare platform (mobile + web) for doctor booking, AI-based meal analysis, and medical e-commerce - Grade: Excellent',
  },
  projects: [
    {
      id: 1,
      title: 'Harfi',
      category: 'Full Stack / AI',
      technologies: 'Angular 21, TypeScript, ASP.NET Core, SignalR, Bootstrap 5 RTL, RAG-based AI',
      image: '/images/project-1.png',
      description:
        'Arabic-first craftsmen marketplace platform (ITI graduation project). Served as both Frontend Lead and Backend Lead on a 5-developer team, owning end-to-end architecture. Frontend: Angular 21 standalone-component architecture, authentication and routing, bilingual RTL/LTR i18n, theming, and real-time SignalR-powered chat and notifications UI. Backend: ASP.NET Core Web API with JWT authentication, SignalR hubs for real-time messaging, and a RAG-based AI assistant backed by vector search for conversational craftsman discovery.',
    },
    {
      id: 2,
      title: 'Tasweeqar',
      category: 'Company Website',
      technologies: 'Angular 21, TypeScript, SCSS, i18n (AR/EN), Signal-based Reactivity',
      image: '/images/project-2.png',
      description:
        'Production-ready bilingual (Arabic RTL / English LTR) company profile website for a Saudi construction firm. Built with Angular 21 standalone components, no NgModules, and full signal-based reactivity, with a custom SCSS design system for services, portfolio, team, and contact sections.',
    },
    {
      id: 3,
      title: 'HealthHub',
      category: 'Mobile App',
      technologies: 'React Native, Laravel, Clarifai API, Spoonacular API, Stripe / PayPal',
      image: '/images/project-3.png',
      description:
        'Scalable doctor appointment system with real-time availability and booking management, AI-based food recognition and nutrition analysis for calorie tracking, and a secure e-commerce payment module.',
    },
    {
      id: 4,
      title: 'University Management System',
      category: 'Full Stack',
      technologies: 'ASP.NET MVC, C#, SQL Server, Entity Framework',
      image: '/images/project-4.png',
      description:
        'Full-stack system for managing students, courses, attendance, and grading, with role-based authentication/authorization and a scalable MVC architecture with full CRUD operations.',
    },
    {
      id: 5,
      title: 'Employee Management System',
      category: 'Full Stack',
      technologies: 'ASP.NET, SQL Server, MVC',
      image: '/images/project-5.png',
      description:
        'HR system for managing employee records through an interactive dashboard, applying the MVC design pattern with clean and maintainable architecture.',
    },
  ],
  contact: {
    email: 'Israashiref@gmail.com',
    phone: '+20 102 949 6150',
    github: 'https://github.com/EsraaShiref',
    linkedin: 'https://linkedin.com/in/esraa-shiref',
  },
  skills: {
    develop: {
      title: 'FRONTEND',
      description: 'Building scalable, bilingual, signal-driven UIs',
      details:
        'Building standalone-component Angular 21 applications with signal-based reactivity, alongside React Native mobile apps. Comfortable with bilingual RTL/LTR i18n, theming, and real-time UI powered by SignalR.',
      tools: ['Angular', 'React Native', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Redux', 'SCSS'],
    },
    design: {
      title: 'BACKEND & AI',
      description: 'APIs, databases, and applied Generative AI',
      details:
        'Designing ASP.NET Core Web APIs with JWT authentication and SignalR hubs, backed by SQL Server, PostgreSQL, or Firebase. Applying Generative AI concepts including RAG-based assistants, vector search, and LLM prompt engineering.',
      tools: ['ASP.NET Core', 'ASP.NET MVC', 'Laravel', 'Entity Framework', 'SQL Server', 'PostgreSQL', 'Firebase', 'OpenAI API', 'REST APIs'],
    },
  },
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Upper-Intermediate' },
  ],
};
