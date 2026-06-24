export interface StatItem { value: string; label: string; }
export interface ServiceItem { title: string; desc: string; tag: string | null; }
export interface WhyItem { title: string; desc: string; }

export interface HeroContent {
  badge: string;
  subheadline: string;
  stats: StatItem[];
  cta1: string;
  cta2: string;
}

export interface ServicesContent {
  badge: string;
  headline: string;
  headline2: string;
  subheadline: string;
  items: ServiceItem[];
}

export interface WhyContent {
  badge: string;
  headline: string;
  headline2: string;
  subheadline: string;
  items: WhyItem[];
}

export interface ContactContent {
  headline: string;
  subheadline: string;
  body: string;
  whatsapp: string;
  reassurances: string[];
}

export interface SiteContent {
  hero: HeroContent;
  services: ServicesContent;
  why: WhyContent;
  contact: ContactContent;
}
