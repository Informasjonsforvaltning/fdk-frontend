// import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import RootLayout, { generateStaticParams } from '@fdk-frontend/ui/layout-root';
import Breadcrumbs, { BreadcrumbsContainer } from '@fdk-frontend/ui/breadcrumbs';

import styles from './docs-layout.module.scss';

const DocsLayout = async (props: RootLayoutProps) => {

	// const dictionary = await getDictionary(props.params.lang, 'data-hunter-page');

  const breadcrumbList = [
      {
          href: `/about`,
          text: 'About',
      }
  ];

	return (
		<RootLayout {...props}>
			<div className={styles.docsLayout}>
				<BreadcrumbsContainer>
					<Breadcrumbs
		          baseUri={undefined}
		          breadcrumbList={breadcrumbList}
		      />
		    </BreadcrumbsContainer>
				{props.children}
				<div className={styles.feedbackBanner}>
					<div className={styles.feedbackBannerInner}>
						Feedback banner here
					</div>
				</div>
			</div>
		</RootLayout>
	);
}

export { generateStaticParams };
export default DocsLayout;
