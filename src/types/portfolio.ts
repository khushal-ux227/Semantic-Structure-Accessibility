/**
 * TypeScript definitions for Elena Rostova's semantic portfolio
 */

export type PageId = 'home' | 'projects' | 'about' | 'articles' | 'contact' | 'audit';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Design Systems' | 'Web Accessibility' | 'Core Web Vitals' | 'Healthcare Systems';
  year: string;
  summary: string;
  client: string;
  challenge: string;
  solution: string;
  wcagCriteria: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
  codeSnippet?: {
    language: string;
    caption: string;
    code: string;
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  publishDate: string;
  isoDate: string;
  readTime: string;
  summary: string;
  tags: string[];
  contentSections: {
    heading: string;
    paragraphs: string[];
    codeBlock?: {
      caption: string;
      code: string;
    };
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  achievements: string[];
  standards: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialId: string;
  url: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  organization: string;
  inquiryType: 'audit' | 'design-system' | 'consulting' | 'speaking' | 'other';
  wcagTarget: 'wcag21-aa' | 'wcag22-aa' | 'wcag22-aaa' | 'section-508' | 'en-301-549';
  budgetTimeline: string;
  message: string;
  consent: boolean;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
  consent?: string;
}
