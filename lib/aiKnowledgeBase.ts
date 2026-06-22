// RONIT.AI Knowledge Base
// Comprehensive portfolio data for intelligent conversational responses

export interface KnowledgeBase {
  personal: {
    name: string;
    role: string[];
    location: string;
    status: string;
    email: string;
    github: string;
    linkedin: string;
    tagline: string;
    about: string;
  };
  education: {
    degree: string;
    branch: string;
    college: string;
    collegeShort: string;
    location: string;
    focus: string[];
    description: string;
  };
  skills: {
    frontend: string[];
    backend: string[];
    languages: string[];
    database: string[];
    ai: string[];
    tools: string[];
    core: string[];
  };
  experience: {
    role: string;
    company: string;
    type: string;
    responsibilities: string[];
    technologies: string[];
    description: string;
  };
  projects: {
    compressx: {
      name: string;
      tagline: string;
      description: string;
      problem: string;
      solution: string;
      features: string[];
      technologies: string[];
      status: string;
      link: string;
      highlights: string[];
    };
    algoryxmail: {
      name: string;
      tagline: string;
      description: string;
      problem: string;
      solution: string;
      features: string[];
      technologies: string[];
      status: string;
      link: string;
      highlights: string[];
    };
  };
  achievements: {
    projects: string;
    technologies: string;
    repositories: string;
    hours: string;
  };
  interests: string[];
  careerGoals: string;
}

export const knowledgeBase: KnowledgeBase = {
  personal: {
    name: "Ronit Madage",
    role: ["Computer Engineering Student", "Full Stack Developer", "AI Enthusiast"],
    location: "Mumbai, Maharashtra, India",
    status: "Open to internships and collaborations",
    email: "ronitmadage@gmail.com",
    github: "https://github.com/ronitmadage25-boop",
    linkedin: "https://www.linkedin.com/in/ronit-madage-92ab213b0/",
    tagline: "Building intelligent products, modern web applications, and AI-powered solutions for real-world problems.",
    about: "Ronit Madage is a Computer Engineering student at Sardar Patel Institute of Technology (SPIT), Mumbai. He enjoys building modern web applications, exploring artificial intelligence, and creating software solutions that solve real-world problems. His interests span software engineering, AI-driven products, full-stack development, and user-centric digital experiences."
  },
  
  education: {
    degree: "Bachelor of Engineering (B.E.)",
    branch: "Computer Engineering",
    college: "Sardar Patel Institute of Technology",
    collegeShort: "SPIT",
    location: "Mumbai, Maharashtra, India",
    focus: [
      "Software Development",
      "Artificial Intelligence",
      "Full-Stack Technologies",
      "Modern Engineering Practices",
      "Web Development",
      "Machine Learning"
    ],
    description: "Ronit is currently pursuing a Bachelor of Engineering in Computer Engineering from Sardar Patel Institute of Technology (SPIT), Mumbai. His academic focus includes software development, artificial intelligence, full-stack technologies, and modern engineering practices. He is passionate about building impactful products using cutting-edge technologies."
  },

  skills: {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "FastAPI", "PHP", "Python"],
    languages: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++", "PHP"],
    database: ["MySQL", "MongoDB", "SQLite"],
    ai: ["Machine Learning", "Natural Language Processing", "AI Integration", "Python for AI"],
    tools: ["Git", "GitHub", "VS Code", "Android Studio", "Vercel", "Netlify"],
    core: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks"
    ]
  },

  experience: {
    role: "Web Development Intern",
    company: "V2V EdTech LLP",
    type: "Internship",
    responsibilities: [
      "Developed responsive web interfaces using HTML, CSS, and JavaScript",
      "Worked on backend development using PHP",
      "Integrated MySQL databases for data management",
      "Optimized website performance and usability",
      "Improved user experience through bug fixing and interface enhancements",
      "Collaborated on real-world software development projects"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    description: "During his internship at V2V EdTech LLP, Ronit gained hands-on experience in web development. He developed responsive interfaces, worked on backend systems using PHP, integrated MySQL databases, and improved website performance and usability. This experience strengthened his full-stack development capabilities and real-world problem-solving skills."
  },

  projects: {
    compressx: {
      name: "CompressX",
      tagline: "AI-Powered Image Optimization Platform",
      description: "An AI-powered image compression platform designed to intelligently reduce image size while maintaining visual quality, improving storage efficiency, faster sharing, and better web performance.",
      problem: "Large image files increase storage requirements, reduce website performance, and slow down content sharing.",
      solution: "Built an AI-powered image compression platform that intelligently reduces image size while maintaining visual quality.",
      features: [
        "Intelligent image optimization",
        "Fast compression processing",
        "Quality preservation",
        "Modern responsive interface",
        "Multiple format support"
      ],
      technologies: ["Next.js", "TypeScript", "AI Processing", "Modern UI", "Vercel"],
      status: "Live",
      link: "https://compressx-phi.vercel.app/",
      highlights: [
        "Improved storage efficiency",
        "Faster image sharing",
        "Better web performance",
        "Optimized memory allocation in serverless environments"
      ]
    },
    algoryxmail: {
      name: "AlgoryxMail AI Detector",
      tagline: "AI Content Detection Platform",
      description: "An AI-driven email analysis platform that identifies AI-generated and suspicious email content using machine learning and natural language processing techniques.",
      problem: "Increasing sophistication of AI-generated phishing emails makes it difficult for users to identify malicious intent, leading to security breaches.",
      solution: "Developed an advanced AI-driven detection engine that analyzes email patterns, semantics, and metadata to flag AI-generated and malicious content with high accuracy.",
      features: [
        "AI-generated content analysis",
        "Human-written content estimation",
        "Email threat detection",
        "Real-time analysis",
        "Clean user interface"
      ],
      technologies: ["React", "Python", "Machine Learning", "FastAPI", "NLP"],
      status: "Live",
      link: "https://algoryxmail-ai.netlify.app/",
      highlights: [
        "Enhanced email security",
        "Reduced phishing success rates",
        "Real-time threat analysis",
        "Low false positive rate"
      ]
    }
  },

  achievements: {
    projects: "8+ production-ready applications",
    technologies: "15+ frameworks and tools",
    repositories: "20 open source contributions",
    hours: "500+ engineering hours"
  },

  interests: [
    "Artificial Intelligence",
    "Software Engineering",
    "Full-Stack Development",
    "Web Development",
    "Android Development",
    "Product Development",
    "Modern UI/UX Design",
    "Performance Optimization",
    "Open Source Technologies"
  ],

  careerGoals: "To become a highly skilled software professional who builds impactful products using modern technologies, artificial intelligence, and engineering best practices while continuously learning, innovating, and solving real-world challenges."
};

// Intelligent query matcher
export function matchQuery(query: string): string {
  const q = query.toLowerCase().trim();
  
  // Personal/About queries
  if (q.match(/who (is|are) (ronit|you)|tell me about (ronit|yourself)|about (ronit|you)|introduce/i)) {
    return 'about';
  }
  
  // Education queries
  if (q.match(/where.*stud(y|ying|ies)|college|university|education|degree|branch|academic|spit|pursuing|institute/i)) {
    return 'education';
  }
  
  // Skills queries
  if (q.match(/skill|technolog(y|ies)|know|proficient|languages?|framework|tool|stack|frontend|backend|database/i)) {
    return 'skills';
  }
  
  // Experience queries
  if (q.match(/experience|internship|work|job|company|v2v|edtech/i)) {
    return 'experience';
  }
  
  // CompressX queries
  if (q.match(/compress|compressx|image.*optimi|image.*compress/i)) {
    return 'compressx';
  }
  
  // AlgoryxMail queries
  if (q.match(/algoryx|mail|email.*detect|ai.*detect|phishing/i)) {
    return 'algoryxmail';
  }
  
  // Projects queries (general)
  if (q.match(/project|built|portfolio|work|showcase/i)) {
    return 'projects';
  }
  
  // Resume queries
  if (q.match(/resume|cv|download/i)) {
    return 'resume';
  }
  
  // Contact queries
  if (q.match(/contact|reach|email|connect|linkedin|github/i)) {
    return 'contact';
  }
  
  // Achievement queries
  if (q.match(/achievement|accomplish|impact|metric|stat/i)) {
    return 'achievements';
  }
  
  // Career/Goals queries
  if (q.match(/goal|career|aspirat|future|plan/i)) {
    return 'goals';
  }
  
  return 'default';
}

// Response generator
export function generateResponse(queryType: string): string {
  const kb = knowledgeBase;
  
  switch (queryType) {
    case 'about':
      return `**${kb.personal.name}** is a ${kb.personal.role[0]} at ${kb.education.college} (SPIT), Mumbai. ${kb.personal.about}\n\n**Current Status:** ${kb.personal.status}\n\n**Focus Areas:** ${kb.personal.tagline}`;
    
    case 'education':
      return `**${kb.personal.name}** is currently pursuing a **${kb.education.degree}** in **${kb.education.branch}** from **${kb.education.college} (${kb.education.collegeShort})**, ${kb.education.location}.\n\n**Academic Focus:**\n${kb.education.focus.map(f => `• ${f}`).join('\n')}\n\nHis coursework and projects emphasize modern software engineering, artificial intelligence, and building scalable real-world applications.`;
    
    case 'skills':
      return `**${kb.personal.name}** has expertise across multiple technology domains:\n\n**Frontend Development:**\n${kb.skills.frontend.join(' • ')}\n\n**Backend Development:**\n${kb.skills.backend.join(' • ')}\n\n**Programming Languages:**\n${kb.skills.languages.join(' • ')}\n\n**Databases:**\n${kb.skills.database.join(' • ')}\n\n**AI & Machine Learning:**\n${kb.skills.ai.join(' • ')}\n\n**Tools & Platforms:**\n${kb.skills.tools.join(' • ')}\n\nHe also has strong foundations in ${kb.skills.core.slice(0, 3).join(', ')}, and other core computer science principles.`;
    
    case 'experience':
      return `**${kb.experience.role}** at **${kb.experience.company}**\n\n${kb.experience.description}\n\n**Key Responsibilities:**\n${kb.experience.responsibilities.map(r => `• ${r}`).join('\n')}\n\n**Technologies Used:** ${kb.experience.technologies.join(', ')}`;
    
    case 'compressx':
      const cx = kb.projects.compressx;
      return `**${cx.name}** — *${cx.tagline}*\n\n${cx.description}\n\n**Problem Statement:**\n${cx.problem}\n\n**Solution:**\n${cx.solution}\n\n**Key Features:**\n${cx.features.map(f => `• ${f}`).join('\n')}\n\n**Technology Stack:**\n${cx.technologies.join(' • ')}\n\n**Status:** ${cx.status}\n\n🚀 [Launch Demo](${cx.link})`;
    
    case 'algoryxmail':
      const ax = kb.projects.algoryxmail;
      return `**${ax.name}** — *${ax.tagline}*\n\n${ax.description}\n\n**Problem Statement:**\n${ax.problem}\n\n**Solution:**\n${ax.solution}\n\n**Key Features:**\n${ax.features.map(f => `• ${f}`).join('\n')}\n\n**Technology Stack:**\n${ax.technologies.join(' • ')}\n\n**Status:** ${ax.status}\n\n🚀 [Launch Demo](${ax.link})`;
    
    case 'projects':
      return `**${kb.personal.name}** has built several impactful projects:\n\n**1. ${kb.projects.compressx.name}**\n${kb.projects.compressx.description}\n🚀 [View Project](${kb.projects.compressx.link})\n\n**2. ${kb.projects.algoryxmail.name}**\n${kb.projects.algoryxmail.description}\n🚀 [View Project](${kb.projects.algoryxmail.link})\n\n*Interested in learning more? Ask me about a specific project!*`;
    
    case 'resume':
      return `📄 **Resume Download**\n\nYou can download Ronit's resume here:\n\n[Download Resume](/Ronit_Madage_Resume.pdf)\n\nThe resume includes detailed information about his education, technical skills, projects, internship experience, and achievements.`;
    
    case 'contact':
      return `**Get in Touch with ${kb.personal.name}**\n\n**Email:** [${kb.personal.email}](mailto:${kb.personal.email})\n**LinkedIn:** [Connect on LinkedIn](${kb.personal.linkedin})\n**GitHub:** [View GitHub Profile](${kb.personal.github})\n**Location:** ${kb.personal.location}\n\n💬 Feel free to reach out for collaborations, internship opportunities, or project discussions!`;
    
    case 'achievements':
      return `**Impact & Achievements**\n\n• **${kb.achievements.projects}** built and deployed\n• **${kb.achievements.technologies}** mastered\n• **${kb.achievements.repositories}** on GitHub\n• **${kb.achievements.hours}** dedicated to coding\n\n${kb.personal.name} is passionate about building technology that solves real problems through software, artificial intelligence, and modern engineering practices.`;
    
    case 'goals':
      return `**Career Goals & Aspirations**\n\n${kb.careerGoals}\n\n**Areas of Interest:**\n${kb.interests.slice(0, 6).map(i => `• ${i}`).join('\n')}\n\nRonit is actively seeking opportunities to contribute to innovative projects, collaborate with talented teams, and grow as a software engineer.`;
    
    default:
      return `I'm **RONIT.AI**, your intelligent guide to Ronit's engineering journey. I can help you learn about:\n\n• **Education** — Academic background and focus areas\n• **Skills** — Technical expertise and technologies\n• **Projects** — CompressX, AlgoryxMail AI Detector, and more\n• **Experience** — Internship and work history\n• **Resume** — Download and view credentials\n• **Contact** — Get in touch with Ronit\n\nTry asking questions like:\n*"Where is Ronit pursuing engineering?"*\n*"Tell me about CompressX"*\n*"What technologies does Ronit know?"*`;
  }
}
