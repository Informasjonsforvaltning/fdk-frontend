import RootLayout, { generateStaticParams } from '@fdk-frontend/ui/layout-root';

import styles from './docs-layout.module.scss';

const DocsLayout = (props: RootLayoutProps) => (
	<RootLayout {...props}>
		<div className={styles.docsLayout}>
			{/*<div className={styles.breadcrumbs}>
				Breadcrumbs here
			</div>*/}
			{props.children}
			<div className={styles.feedbackBanner}>
				<div className={styles.feedbackBannerInner}>
					Feedback banner here
				</div>
			</div>
		</div>
	</RootLayout>
);

export { generateStaticParams };
export default DocsLayout;
