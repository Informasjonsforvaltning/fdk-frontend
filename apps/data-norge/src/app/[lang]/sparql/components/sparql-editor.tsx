'use client';

import { Skeleton } from '@digdir/designsystemet-react';
import React from 'react';
import '@zazuko/yasgui/build/yasgui.min.css';

interface SparqlEditorProps {
    endpoint: string;
    className?: string;
}

export const SparqlEditor = ({ endpoint, className }: SparqlEditorProps) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (containerRef.current && typeof window !== 'undefined') {
            import('@zazuko/yasgui').then((Yasgui) => {
                new Yasgui.default(containerRef.current as HTMLElement, {
                    autofocus: true,
                    requestConfig: { endpoint: endpoint },
                    copyEndpointOnNewTab: true,
                    endpointCatalogueOptions: {
                        getData: () => [
                            {
                                endpoint: endpoint
                            }
                        ]
                    }
                });
                setIsLoaded(true);
            });
        }
    }, [endpoint]);

    return (
        <>
            {!isLoaded && <Skeleton title="Loading SPARQL editor..." height={400} />}
            <div ref={containerRef} className={className} />
        </>
    );
};
