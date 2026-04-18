import { defineCollection, z } from 'astro:content';

const postCollection = defineCollection({
  type: 'content',
  schema: z
    .object({
      /** 标题 (必填) */
      title: z.string(),
      /** 描述 */
      description: z.string().optional(),
      /** 标签 */
      tags: z.array(z.string()).optional(),
      /** 是否为草稿 */
      draft: z.boolean().optional().default(false),
      
      /** 兼容你的日期格式：支持 pubDate 或 published */
      pubDate: z.coerce.date().optional(),
      published: z.coerce.date().optional(),

      /** 你需要的额外字段 */
      category: z.string().optional(), // 分类
      author: z.string().optional(),   // 作者
      pinned: z.boolean().optional().default(false), // 是否置顶
      permalink: z.string().optional(), // 自定义链接
      image: z.string().optional(),     // 封面图
    })
    .refine(
      (data) => {
        // 如果不是草稿，则必须提供 pubDate 或 published 其中之一
        if (data.draft === true) {
          return true;
        }
        return data.pubDate !== undefined || data.published !== undefined;
      },
      {
        message: '当 draft 为 false 时，必须提供 pubDate 或 published 发布日期',
        path: ['pubDate'],
      },
    ),
});

export const collections = { post: postCollection };
