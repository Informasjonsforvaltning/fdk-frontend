import React from 'react';
import cn from 'classnames';

import { FilesIcon, CodeIcon, ChatElipsisIcon, TenancyIcon, CompassIcon, SparklesIcon } from '@navikt/aksel-icons';

import { CatalogTypes } from '@fdk-frontend/types';

import styles from './catalog-symbol.module.scss';

export type CatalogSymbolProps = {
    catalog: CatalogTypes;
};

const CatalogIcon = ({ catalog, ...rest }: CatalogSymbolProps & React.SVGProps<SVGSVGElement>) => {
    switch (catalog) {
        case 'datasets':
            return <FilesIcon {...rest} />;
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
    }
};

const CatalogSymbol = ({ catalog, className, ...rest }: CatalogSymbolProps & React.SVGProps<SVGSVGElement>) => {
    return (
        <div className={cn(styles.catalogSymbol, className)}>
            <CatalogIcon
                catalog={catalog}
                aria-hidden
                {...rest}
            />
        </div>
    );
};

export default CatalogSymbol;
export { CatalogIcon };
