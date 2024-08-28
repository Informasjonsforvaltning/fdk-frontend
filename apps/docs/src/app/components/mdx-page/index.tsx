import cn from 'classnames';

import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import DynamicBreadcrumbs from '@fdk-frontend/ui/dynamic-breadcrumbs';
import { i18n, type Locale, getDictionary } from '@fdk-frontend/dictionaries';

import Sidebar from '../../components/sidebar';
import TableOfContents from '../../components/table-of-contents';

import pageStyles from './mdx-page.module.scss';
import typography from './typography.module.scss';

import { extractHeadlines } from './utils';

const MdxPage = async ({ children, sidebars = true, slug, locale, baseUri, source }) => {

	const docsDictionary = await getDictionary(locale, 'docs');
  const commonDictionary = await getDictionary(locale, 'common');

  const headlines = extractHeadlines(source);

	return (
		<div className={pageStyles.mdxPage}>
			<DynamicBreadcrumbs
				docsDictionary={docsDictionary}
				commonDictionary={commonDictionary}
				baseUri={baseUri}
				locale={locale}
			/>
			<div className={pageStyles.content}>
				{
					sidebars &&
					<aside>
						<Sidebar
							dictionary={docsDictionary}
							slug={slug}
							locale={locale}
						/>
					</aside>
				}
				<article className={cn(pageStyles.article, typography.article)}>
					{children}
				</article>
				{
					sidebars &&
					<aside>
						<TableOfContents headlines={headlines} />
					</aside>
				}
			</div>
		</div>
	);
}

export default MdxPage;