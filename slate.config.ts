/*
 * @file Theme configuration
 */
import { defineConfig } from './src/helpers/config-helper';

export default defineConfig({
  lang: 'en-US',
  site: 'https://megan-woad.vercel.app',
  avatar: '/avatar.webp',
  title: 'Megan L O’Donnell',
  description: 'Sometimes think, somtimes cry.',
  lastModified: true,
  readTime: true,
  footer: {
    copyright: '',
  },
  socialLinks: [],
});
