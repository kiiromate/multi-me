declare module '@sanity/vision';
declare module 'sanity';
declare module 'sanity/desk';

export interface Post {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  content: string;
  publishedAt: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Project {
  _id: string;
  _type: 'project';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: {
    asset: {
      url: string;
    };
  };
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: 'completed' | 'in-progress' | 'planned';
}

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  title: string;
  description?: string;
  url?: string;
  author?: {
    name?: string;
    email?: string;
    bio?: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
} 