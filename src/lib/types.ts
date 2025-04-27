export interface NavItem {
  title: string;
  href: string;
}

export interface HeaderConfig {
  logo: {
    src: string;
    alt: string;
    href: string;
  };
  navItems: NavItem[];
}

export interface FooterConfig {
  copyright: string;
  links: {
    title: string;
    href: string;
  }[];
  relatedGameLinks?: {
    title: string;
    games: {
      title: string;
      href: string;
    }[];
  }[];
}

export interface GameConfig {
  id: string;
  routeId?: string;
  seoTitle?: string;
  title: string;
  subtitle: string;
  description: string;
  iframeUrl?: string;
  plays: number;
  instructions: string; // Markdown content
}

export interface GameBaseConfig {
  id: string;
  routeId?: string;
  seoTitle?: string;
  title: string;
  subtitle: string;
  description: string;
  iframeUrl?: string;
  imageId?: string;
  plays: number;
}

export interface GameCollectionConfig {
  title: string;
  gameIds: string[];
}

export interface SiteConfig {
  baseUrl: string;
  cdnBaseUrl: string;
  name: string;
}

export interface CategoryConfig {
  id: string;
  seoTitle: string;
  title: string;
  description: string;
  gameIds: string[];
}