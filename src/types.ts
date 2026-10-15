export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  tagColor?: 'emerald' | 'amber' | 'rose' | 'teal';
  description: string;
  features: string[];
  duration: string;
  price: number; // in PEN (Soles)
  priceUnit?: string;
  active: boolean;
  isUrgent?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  district: string;
  service: string;
  rating: number;
  comment: string;
  initials: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BiosecurityPhase {
  step: number;
  title: string;
  description: string;
  badge: string;
  icon: string;
}

export interface MediaImage {
  id: string;
  title: string;
  tag: string;
  url: string;
  dimensions: string;
  isHero?: boolean;
}

export interface SiteContent {
  // Hero & Brand
  clinicName: string;
  clinicTagline: string;
  doctorName: string;
  doctorTitle: string;
  doctorRole: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  defaultWhatsAppMessage: string;
  
  // Hero Visual
  heroImageUrl: string;
  doctorAvatarUrl: string;
  doctorSecondaryPhotoUrl: string;

  // Metrics
  metricYears: string;
  metricAutoclave: string;
  metricPatients: string;
  metricCareWays: string;

  // About Specialist
  aboutEyebrow: string;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutQuote: string;

  // Recover metrics
  statPainRelief: number;
  statSatisfaction: number;
  statRecidivismRate: number;

  // Images
  sterileTrayImageUrl: string;
  restoredFeetImageUrl: string;
  mapImageUrl: string;

  // Clinic details
  address: string;
  email: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  districts: string[];

  // Dynamic lists
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  mediaGallery: MediaImage[];
}
