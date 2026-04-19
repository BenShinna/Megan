export interface SlateConfig {
  /** Final deployment link */
  site: string;
  /** Language */
  lang?: LangType;
  /** Theme */
  theme?: ThemeOptions;
  /** Avatar */
  avatar?: string;
  /** Avatar Back (flip image) */
  avatarBack?: string;  // ← 加这一行
  /** Sitemap configuration */
  sitemap?: SitemapOptions;
  /** Website title */
  title: string;
  /** Website description */
  description: string;
  /** Whether to show reading time */
  readTime?: boolean;
  /** Whether to show last modified time */
  lastModified?: boolean;
  /** Docsearch configuration */
  algolia?: {
    appId: string;
    apiKey: string;
    indexName: string;
  };
  /** Website footer configuration */
  footer?: {
    copyright: string;
  };
  /** Follow subscription authentication configuration */
  follow?: {
    feedId: string;
    userId: string;
  };
  /** 社交链接 */
  socialLinks?: SocialLink[];
}
