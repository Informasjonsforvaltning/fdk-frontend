// import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
// import { Breadcrumbs, BreadcrumbsContainer } from '@fdk-frontend/ui/breadcrumbs';

import styles from './layout.module.scss';

const AboutLayout = async (props) => {

	// const dictionary = await getDictionary(props.params.lang, 'data-hunter-page');

  // const breadcrumbList = [
  //     {
  //         href: `/about`,
  //         text: 'About',
  //     }
  // ];

	return (
		<div className={styles.layout}>
			{/*<BreadcrumbsContainer>
				<Breadcrumbs
	          baseUri={undefined}
	          breadcrumbList={breadcrumbList}
	          dictionary={dictionary}
	      />
	    </BreadcrumbsContainer>*/}
			<div className={styles.content}>
				{props.children}
			</div>
		</div>
	);
}

export default AboutLayout;