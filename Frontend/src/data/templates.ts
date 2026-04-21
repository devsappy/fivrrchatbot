export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  url: string;
}

export const projects: Project[] = [
  {
    id: 0,
    title: 'Crunchbox',
    description: 'Eye-catching e-commerce website for a snack brand with lively product showcases and a smooth checkout flow.',
    tags: ['E-Commerce', 'Food', 'Brand'],
    category: 'E-Commerce',
    url: 'https://crunchbox-eight.vercel.app',
  },
  {
    id: 1,
    title: 'Anon Store',
    description: 'Minimal e-commerce platform with a clean shopping experience, product listings and checkout process.',
    tags: ['E-Commerce', 'Minimal', 'Shop'],
    category: 'E-Commerce',
    url: 'https://anon-demo.vercel.app',
  },
  {
    id: 11,
    title: 'Kilnforge',
    description: 'E-commerce site for a specialty coffee roasting equipment brand with crafted product showcases and shop flow.',
    tags: ['E-Commerce', 'Coffee', 'Brand'],
    category: 'E-Commerce',
    url: 'https://kilnforge.vercel.app',
  },
  {
    id: 12,
    title: 'Pixel Forge',
    description: 'Web development agency site with bold motion and interactive visuals — "websites that feel alive."',
    tags: ['Agency', 'Portfolio', 'Interactive'],
    category: 'Portfolio',
    url: 'https://pixelforge-tau.vercel.app',
  },
  {
    id: 2,
    title: 'StudioType',
    description: 'Creative studio website driven by bold typography, branding projects and visual identities.',
    tags: ['Studio', 'Typography', 'Portfolio'],
    category: 'Portfolio',
    url: 'https://studiotype.vercel.app',
  },
  {
    id: 3,
    title: 'Aset AI',
    description: 'Landing page for an AI-powered platform highlighting intelligent automation features and services.',
    tags: ['Landing Page', 'AI', 'SaaS'],
    category: 'Landing Page',
    url: 'https://aset-six.vercel.app',
  },
  {
    id: 4,
    title: 'Matias — Creative Designer',
    description: 'Portfolio website for a visual designer showcasing work samples, services and brand identity.',
    tags: ['Portfolio', 'Creative', 'Design'],
    category: 'Portfolio',
    url: 'https://agencyowner-demo.vercel.app',
  },
  {
    id: 5,
    title: 'Café Kaleido',
    description: 'Inviting café website with menu highlights, ambience gallery and a reservation-ready layout.',
    tags: ['Hospitality', 'Café', 'Brand'],
    category: 'Travel & Hospitality',
    url: 'https://cafekaleido.vercel.app',
  },
  {
    id: 6,
    title: 'Wander PH',
    description: 'Travel discovery site featuring destinations in the Philippines — visually rich with curated guides.',
    tags: ['Travel', 'Editorial', 'Discovery'],
    category: 'Travel & Hospitality',
    url: 'https://wander-ph.vercel.app',
  },
  {
    id: 7,
    title: 'Buzzball',
    description: 'Vibrant e-commerce website for a ready-to-drink cocktail brand with product showcase and ordering.',
    tags: ['E-Commerce', 'Beverage', 'Brand'],
    category: 'E-Commerce',
    url: 'https://buzzball-demo.vercel.app',
  },
  {
    id: 8,
    title: 'Landing Page — Starter',
    description: 'Clean, conversion-focused single-page design built for speed and maximum impact.',
    tags: ['Landing Page', 'Starter', 'Responsive'],
    category: 'Landing Page',
    url: 'https://landingpage1-peach.vercel.app',
  },
  {
    id: 9,
    title: 'Expertise & Risk Management',
    description: 'Professional B2B consulting website focused on risk assessment, mitigation strategies and expert advice.',
    tags: ['B2B', 'Consulting', 'Enterprise'],
    category: 'B2B',
    url: 'https://ve-v2.vercel.app',
  },
  {
    id: 10,
    title: 'CollabTrack',
    description: 'A task and progress management platform for creative teams to organise and track projects.',
    tags: ['SaaS', 'Project Management', 'Dashboard'],
    category: 'SaaS',
    url: 'https://collab-tracker.vercel.app',
  },
  {
    id: 13,
    title: 'Ferrari LaFerrari 3D',
    description: 'Immersive 3D product showcase for the Ferrari LaFerrari with interactive controls, specs and performance highlights.',
    tags: ['3D', 'Landing Page', 'Interactive'],
    category: 'Landing Page',
    url: 'https://ferrari3d.vercel.app',
  },
];

export const categories = ['All', 'E-Commerce', 'Landing Page', 'Portfolio', 'SaaS', 'B2B', 'Travel & Hospitality'];
