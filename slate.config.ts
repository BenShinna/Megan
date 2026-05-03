import { defineConfig } from './src/helpers/config-helper';

export default defineConfig({
  lang: 'en-US',
  site: 'https://megan-woad.vercel.app',
  avatar: '/avatar.jpg',
  // avatarBack: '/avatar-back.png',  // ← 如非必需可注释
  title: 'Megan L O'Donnell',
  description: 'Sometimes think, sometimes cry.',  // ← 修正拼写
  lastModified: true,
  readTime: true,
  footer: {
    copyright: '',
  },
  socialLinks: [],
});