/*
 * @Author: kim
 * @Description: rss 提要
 */
import rss from '@astrojs/rss';
import { experimental_AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getCollection, render } from 'astro:content';
import { getContainerRenderer as mdxContainerRenderer } from "@astrojs/mdx";
import sanitizeHtml from 'sanitize-html';
import slateConfig from '~@/slate.config';

export async function GET(context) {
  const blog = await getCollection('post');
  const renderers = await loadRenderers([mdxContainerRenderer()]);
  const container = await experimental_AstroContainer.create({
    renderers,
  });

  const postItems = await Promise.all(blog
    .filter((post) => !post.data.draft)
    .sort((a, b) => {
      // 兼容双日期的排序逻辑
      const dateA = (a.data.pubDate || a.data.published || new Date(0)).getTime();
      const dateB = (b.data.pubDate || b.data.published || new Date(0)).getTime();
      return dateB - dateA;
    })
    .map(async (post) => {
      const { Content } = await render(post);
      const htmlStr = await container.renderToString(Content);

      return {
        ...post.data, 
        // 【核心修改】链接优先使用 permalink，确保 RSS 订阅跳转路径正确
        link: `/blog/${post.data.permalink || post.slug}/`,
        title: post.data.title,
        // 显式指定 RSS 规范要求的 pubDate 字段
        pubDate: post.data.pubDate || post.data.published, 
        content: sanitizeHtml(htmlStr, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        }),
      }
    }));

  const rssOptions = {
    stylesheet: '/pretty-feed-v3.xsl',
    title: slateConfig.title,
    description: slateConfig.description,
    site: context.site,
    trailingSlash: false,
    items: postItems,
  }

  if(slateConfig.follow) {
    rssOptions.customData = `<follow_challenge>
      <feedId>${slateConfig.follow.feedId}</feedId>
      <userId>${slateConfig.follow.userId}</userId>
    </follow_challenge>`;
  }

  return rss(rssOptions);
}
