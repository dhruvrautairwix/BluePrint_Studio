export interface Project {
  id: string;
  title: string;
  category: "Architecture" | "Interiors" | "Urban" | "Object";
  location: string;
  year: string;
  collaborators?: string;
  description: string;
  coverImage: string;
  images: string[];
  slug: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
  slug: string;
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface AwardCase {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  coverImage: string;
  images: string[];
  slug: string;
}

export interface DynamiteItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  mediaType: "image" | "video";
  src: string;
  thumbnail?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  position?: {
    x: number;
    y: number;
    rotation?: number;
  };
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Urban Bistro Interior",
    category: "Interiors",
    location: "Mississauga, ON",
    year: "2023",
    collaborators: "Mr. Vignesh",
    description: "A compact bistro with a warm, stylish atmosphere and flexible seating. The goal was clear circulation, comfort at all times of day, and visuals that communicate the feeling of the space in seconds.",
    coverImage: "/images/urban-bistro-mississauga-dining-2.png",
    images: [
      "/images/urban-bistro-mississauga-dining-2.png",
      "/images/urban-bistro-mississauga-dining-3.png",
    ],
    slug: "urban-bistro-interior",
  },
  {
    id: "2",
    title: "Law Office Interior",
    category: "Interiors",
    location: "Mississauga, ON",
    year: "2024",
    collaborators: "Astron Legal Group",
    description: "A contemporary law office that balances clarity with warmth. The brief asked for a space that communicates confidence to clients, focuses staff, and photographs well without feeling cold.",
    coverImage: "/images/astron-legal-boardroom.jpg",
    images: [
      "/images/astron-legal-boardroom.jpg",
      "/images/astron-legal-boardroom (1).jpg",
      "/images/astron-legal-reception-1.jpg",
      "/images/astron-legal-reception-2.jpg",
      "/images/astron-legal-executive-cabin-1.jpg",
      "/images/astron-legal-executive-cabin-2.jpg",
      "/images/astron-legal-cabin.jpg",
    ],
    slug: "law-office-interior",
  },
  {
    id: "3",
    title: "Eastview Courtyard Loft",
    category: "Interiors",
    location: "Toronto, ON",
    year: "2024",
    collaborators: "DreamHome Renovators",
    description: "A small-footprint loft organized around a courtyard edge. The brief focused on a strong indoor-outdoor connection, open planning, and textural contrast without visual clutter.",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    ],
    slug: "eastview-courtyard-loft",
  },
  {
    id: "4",
    title: "Sculptural Light Fixture",
    category: "Object",
    location: "Milan, Italy",
    year: "2024",
    description: "A handcrafted light fixture that combines form and function in a sculptural expression.",
    coverImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    ],
    slug: "sculptural-light-fixture",
  },
  {
    id: "5",
    title: "Coastal Retreat House",
    category: "Architecture",
    location: "Malibu, USA",
    year: "2023",
    description: "A serene coastal home that blurs the boundaries between indoor and outdoor living.",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    ],
    slug: "coastal-retreat-house",
  },
  {
    id: "6",
    title: "Luxury Hotel Lobby",
    category: "Interiors",
    location: "Dubai, UAE",
    year: "2024",
    description: "An opulent hotel lobby design that creates a memorable first impression through luxury and elegance.",
    coverImage: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    ],
    slug: "luxury-hotel-lobby",
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Studio Wins International Design Award",
    date: "March 15, 2024",
    excerpt: "Our latest project has been recognized with the prestigious International Design Award for innovation in sustainable architecture.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&h=600&q=80&ixlib=rb-4.0.3",
    content: "We are thrilled to announce that our Urban Residency Complex project has been awarded the International Design Award 2024. This recognition highlights our commitment to sustainable design and innovative architectural solutions...",
    slug: "studio-wins-international-design-award",
  },
  {
    id: "2",
    title: "New Exhibition: Form & Function",
    date: "February 28, 2024",
    excerpt: "Join us for our upcoming exhibition showcasing the intersection of architectural form and functional design.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&h=600&q=80&ixlib=rb-4.0.3",
    content: "Our new exhibition 'Form & Function' opens next month at the Modern Art Gallery. The show features a curated selection of our recent projects, exploring how we balance aesthetic beauty with practical functionality...",
    slug: "new-exhibition-form-function",
  },
  {
    id: "3",
    title: "Sustainable Design Practices",
    date: "February 10, 2024",
    excerpt: "Learn about our approach to sustainable architecture and how we're reducing environmental impact in our projects.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&h=600&q=80&ixlib=rb-4.0.3",
    content: "Sustainability is at the core of everything we do. From material selection to energy efficiency, we integrate environmental considerations into every stage of our design process...",
    slug: "sustainable-design-practices",
  },
];

export const founders: Founder[] = [
  {
    name: "Alexandra Chen",
    role: "Principal Architect",
    bio: "With over 15 years of experience in architectural design, Alexandra leads our team in creating innovative and sustainable spaces. She holds a Master's in Architecture from MIT.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80&ixlib=rb-4.0.3",
  },
  {
    name: "Marcus Rodriguez",
    role: "Creative Director",
    bio: "Marcus brings a unique vision to our projects, combining artistic sensibility with technical expertise. His work has been featured in numerous international design publications.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80&ixlib=rb-4.0.3",
  },
];

export const awardLogos = [
  { name: "International Design Award", logo: "https://via.placeholder.com/150x80/000000/FFFFFF?text=IDA" },
  { name: "Architectural Excellence", logo: "https://via.placeholder.com/150x80/000000/FFFFFF?text=AE" },
  { name: "Sustainable Design", logo: "https://via.placeholder.com/150x80/000000/FFFFFF?text=SD" },
  { name: "Innovation Prize", logo: "https://via.placeholder.com/150x80/000000/FFFFFF?text=IP" },
];

export const awardCases: AwardCase[] = [
  {
    id: "award-1",
    title: "Global Architecture Laureate",
    category: "International",
    year: "2024",
    description:
      "Recognized for pushing the boundaries of adaptive reuse with our Urban Residency Complex, this award celebrates bold experimentation and human-centered design.",
    coverImage: "https://images.unsplash.com/photo-1529429617124-aee3699c6b86?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1529429617124-aee3699c6b86?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    ],
    slug: "global-architecture-laureate",
  },
  {
    id: "award-2",
    title: "Sustainable Innovation Prize",
    category: "Sustainability",
    year: "2023",
    description:
      "Awarded for our City Park Renovation, highlighting regenerative urban landscapes that foster ecological resilience and community wellbeing.",
    coverImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1512914890250-353c43c14805?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    ],
    slug: "sustainable-innovation-prize",
  },
  {
    id: "award-3",
    title: "Design Futures Honor",
    category: "Design Futures",
    year: "2024",
    description:
      "Celebrating the studio's Sculptural Light Fixture, this honor recognizes the fusion of craft, technology, and storytelling.",
    coverImage: "https://images.unsplash.com/photo-1507898570058-071d0d48b1eb?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1507898570058-071d0d48b1eb?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&h=800&q=80&ixlib=rb-4.0.3",
    ],
    slug: "design-futures-honor",
  },
];

export const dynamiteItems: DynamiteItem[] = [
  {
    id: "dyn-1",
    title: "PROJECT_39_CENTER-PANO.PNG",
    subtitle: "Toronto Waterfront Study",
    description: "Panoramic capture exploring waterfront activation and public interface.",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&h=900&q=80&ixlib=rb-4.0.3",
    thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&h=450&q=70&ixlib=rb-4.0.3",
    dimensions: { width: 360, height: 240 },
    position: { x: -300, y: -130 },
  },
  {
    id: "dyn-2",
    title: "FACTORY-1.JPG",
    subtitle: "Fabrication Lab",
    description: "Experimental prototypes and bespoke fabrication detailing from recent workshops.",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&h=900&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 300, height: 360 },
    position: { x: -160, y: -170 },
  },
  {
    id: "dyn-3",
    title: "FIELD_NOTES_A3.PDF",
    subtitle: "Field Notes",
    description: "Sketch overlays and energy studies captured during site explorations.",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1526481280695-3c4691cbc0c6?auto=format&fit=crop&w=1300&h=900&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 320, height: 260 },
    position: { x: 20, y: -150 },
  },
  {
    id: "dyn-4",
    title: "PROJECT_2_DJI0076.MP4",
    subtitle: "Aerial Motion Study",
    description: "Drone footage choreographing light, scale, and material in context.",
    mediaType: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&h=675&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 340, height: 260 },
    position: { x: 200, y: -140 },
  },
  {
    id: "dyn-5",
    title: "AMERICAN INSTITUTE OF ARCHITECTS AWARD",
    subtitle: "Awards & Media",
    description: "International recognition for experimental civic works.",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1569429594811-127f77ed37c5?auto=format&fit=crop&w=1400&h=930&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 360, height: 240 },
    position: { x: -320, y: -20 },
  },
  {
    id: "dyn-6",
    title: "080_N12.JPG",
    subtitle: "Site Context",
    description: "Material palettes and coastal adjacency research for future interventions.",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&h=900&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 460, height: 300 },
    position: { x: -100, y: -30 },
  },
  {
    id: "dyn-7",
    title: "PROJECT_39_SECTION.DWG",
    subtitle: "Section Study",
    description: "Parametric section analyzing light wells and circulation.",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1400&h=950&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 420, height: 280 },
    position: { x: 140, y: -10 },
  },
  {
    id: "dyn-8",
    title: "PROJECT_2_DSF3276.TIF",
    subtitle: "Material Study",
    description: "Fabrication textures photographed in studio lighting conditions.",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&h=930&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 360, height: 260 },
    position: { x: -280, y: 90 },
  },
  {
    id: "dyn-9",
    title: "PROJECT_2_DSF4772.TIF",
    subtitle: "Atmospheric Render",
    description: "Nighttime activation demonstrating low-energy luminous interventions.",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1529429617124-aee3699c6b86?auto=format&fit=crop&w=1600&h=900&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 340, height: 240 },
    position: { x: -40, y: 120 },
  },
  {
    id: "dyn-10",
    title: "PROJECT_2_DJI0102.MP4",
    subtitle: "Immersive Sequence",
    description: "Sweeping motion narrative capturing the choreography of space.",
    mediaType: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    thumbnail: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&h=675&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 340, height: 240 },
    position: { x: 180, y: 130 },
  },
  {
    id: "dyn-11",
    title: "PROJECT_14_RESIDENTIAL.JPG",
    subtitle: "Residential Concept",
    description: "Green terraces woven through high-density housing proposals.",
    mediaType: "image",
    src: "https://images.unsplash.com/photo-1529429617124-aee3699c6b86?auto=format&fit=crop&w=1600&h=900&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 320, height: 280 },
    position: { x: -120, y: 40 },
  },
  {
    id: "dyn-12",
    title: "PROJECT_2_DJI0050.MP4",
    subtitle: "Urban Tapestry",
    description: "Layered urban montage exploring resilience through adaptive reuse.",
    mediaType: "video",
    src: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&h=675&q=80&ixlib=rb-4.0.3",
    dimensions: { width: 340, height: 230 },
    position: { x: 60, y: 20 },
  },
];

