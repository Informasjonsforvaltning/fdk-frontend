import React from 'react';
import { FilesIcon, CodeIcon, ChatElipsisIcon, TenancyIcon, CompassIcon, SparklesIcon } from '@navikt/aksel-icons';
import { CatalogTypes } from '@fdk-frontend/types';

export type CatalogIconProps = {
    catalog: CatalogTypes;
};

const CatalogIcon = ({ catalog, ...rest }: CatalogIconProps & React.SVGProps<SVGSVGElement>) => {
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

export default CatalogIcon;
