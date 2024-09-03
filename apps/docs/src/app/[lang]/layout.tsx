import RootLayout, { generateStaticParams } from '@fdk-frontend/ui/layout-root';

import FeedbackLayout from '../components/layouts/feedback-layout';

const Layout = async (props: RootLayoutProps) => {
	return (
		<RootLayout {...props}>
			<FeedbackLayout>
				{props.children}
			</FeedbackLayout>
		</RootLayout>
	);
}

export { generateStaticParams };
export default Layout;
