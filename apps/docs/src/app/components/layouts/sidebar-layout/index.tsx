import path from 'path';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import { getMDXFilesMap } from '@fdk-frontend/utils/file-tree';
import DynamicBreadcrumbs from '@fdk-frontend/ui/dynamic-breadcrumbs';
import { BreadcrumbsContainer } from '@fdk-frontend/ui/breadcrumbs';

import Sidebar from '../../sidebar';

import styles from './sidebar-layout.module.scss';

const SidebarLayout = async (props) => {

	const docsDictionary = await getDictionary(props.params.lang, 'docs');
	const commonDictionary = await getDictionary(props.params.lang, 'common');

	const docsPathFromAppRoot = `src/app/[lang]/docs`;
	const filesMap = getMDXFilesMap(path.join(process.cwd(), docsPathFromAppRoot));

	const { FDK_BASE_URI } = process.env;
  const baseUri = FDK_BASE_URI ?? '/';

	return (
		<div>
			<BreadcrumbsContainer>
				<DynamicBreadcrumbs
					docsDictionary={docsDictionary}
					commonDictionary={commonDictionary}
					baseUri={baseUri}
				/>
			</BreadcrumbsContainer>
			<div className={styles.container}>
				<Sidebar
					files={filesMap}
					locale={props.params.lang}
					dictionary={docsDictionary}
				/>
				<div className={styles.mainContent}>
					{props.children}
				</div>
			</div>
		</div>
	);
}

export default SidebarLayout;