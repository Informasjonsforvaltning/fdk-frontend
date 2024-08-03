import cn from 'classnames';

import {
	FilesIcon,
	CodeIcon,
	ChatElipsisIcon,
	TenancyIcon,
	CompassIcon,
	SparklesIcon
} from '@navikt/aksel-icons';

import styles from './catalog-symbol.module.scss';

export type CatalogSymbolProps = {
	catalog: 'datasets' | 'apis' | 'terms' | 'information-models' | 'services-events' | 'ai';
}

const CatalogSymbol = ({ catalog, className, ...rest }: CatalogSymbolProps) => {

	const Icon = (props) => {
		switch (catalog) {
			case 'datasets':
				return <FilesIcon {...props} />;
			case 'apis':
				return <CodeIcon {...props} />;
			case 'terms':
				return <ChatElipsisIcon {...props} />;
			case 'information-models':
				return <TenancyIcon {...props} />;
			case 'services-events':
				return <CompassIcon {...props} />;
			case 'ai':
				return <SparklesIcon {...props} />;
		}
	}

	return (
		<div className={cn(styles.catalogSymbol, className)}>
			<Icon aria-hidden {...rest} />
		</div>
	);
}

export default CatalogSymbol;