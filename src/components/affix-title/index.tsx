---
import dayjs from 'dayjs';
import { type CollectionEntry, getCollection } from 'astro:content';
import i18next from '@/i18n';
import PageLayout from '@/components/layouts/PageLayout.astro';
import ArticleJsonLd from '@/components/json-ld/article.astro';
import Button from '@/components/button';
import AffixTitle from '@/components/affix-title/index.tsx';
import Toc from '@/components/toc';
import CodeGroupEvent from '@/components/code-group-event';
import slateConfig from '~@/slate.config';
import { getFullTitle } from '@/helpers/utils';
import 'remark-block-containers/css';
import '@/assets/style/blog.css';

export async function getStaticPaths() {
	const postEntries = await getCollection('post', ({ data }) => {
		return import.meta.env.DEV || data.draft !== true;
	});

	return postEntries.map((post) => ({
		params: { slug: post.slug },
		props: post,
	}));
}

type Props = CollectionEntry<'post'>;

const post = Astro.props;
const { Content, remarkPluginFrontmatter, headings } = await post.render();

const { title, date, description, lang, cover, tags } = post.data;
const t = await i18next.getFixedT(lang || 'en')();

const postDate = dayjs(date).format('YYYY-MM-DD');
const fullTitle = getFullTitle(title, t('site.title'));
const postUrl = `${slateConfig.site.url}/blog/${post.slug}`;
---

<PageLayout title={fullTitle} description={description} lang={lang} cover={cover}>
	{/* SEO Meta Tags */}
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={postUrl} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={postDate} />
	{tags && tags.length > 0 && (
		<meta property="article:tag" content={tags.join(', ')} />
	)}

	{/* JSON-LD */}
	<ArticleJsonLd title={title} description={description} date={date} cover={cover} tags={tags} />

	<article class="mx-auto max-w-180 px-4">
		{/* Affix Title - Fixed version with explicit type */}
		<AffixTitle client:idle title={title} offsetTop={100} />

		<header class="mb-8 pt-20">
			<h1 class="mb-4 text-3xl font-bold">{title}</h1>
			<div class="flex items-center gap-2 text-sm text-gray-500">
				<time datetime={postDate}>{postDate}</time>
				{tags && tags.length > 0 && (
					<>
						<span>·</span>
						<div class="flex gap-2">
							{tags.map((tag) => (
								<a href={`/tags/${tag}`} class="hover:underline">
									{tag}
								</a>
							))}
						</div>
					</>
				)}
			</div>
		</header>

		<div class="relative">
			{/* Table of Contents */}
			<Toc headings={headings} />

			{/* Post Content */}
			<div class="prose prose-slate dark:prose-invert max-w-none">
				<Content />
			</div>

			{/* Code Group Event Listener */}
			<CodeGroupEvent />
		</div>

		{/* Navigation Buttons */}
		<nav class="mt-12 flex justify-between border-t border-gray-200 pt-8 dark:border-gray-700">
			<Button href="/" variant="secondary">
				← {t('common.backToHome')}
			</Button>
		</nav>
	</article>
</PageLayout>