import React from 'react';
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

const CatalogIcon = ({ catalog, ...rest }: CatalogSymbolProps & React.SVGProps<SVGSVGElement>) => {
	switch (catalog) {
		case 'apis':
			return <CodeIcon {...rest} />;
		case 'terms':
			return <ChatElipsisIcon {...rest} />;
		case 'information-models':
			return <TenancyIcon {...rest} />;
		case 'services-events':
			return <CompassIcon {...rest} />;
		case 'ai':
			return <SparklesIcon {...rest} />;
		case 'datasets':
		default:
			return <FilesIcon {...rest} />;
	}
}

const CatalogSymbol = ({ catalog, className, ...rest }: CatalogSymbolProps & React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn(styles.catalogSymbol, className)}>
			<CatalogIcon catalog={catalog} aria-hidden {...rest} />
		</div>
	);
}

export default CatalogSymbol;
export { CatalogIcon };