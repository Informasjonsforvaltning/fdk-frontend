'use client';

import { PropsWithChildren } from 'react';
import { Divider, Popover } from '@digdir/designsystemet-react';
import { Link } from '../link';

type ConceptPreviewProps = PropsWithChildren & {
    label: string;
    definition: string;
    uri: string;
    goToDataNorgeText: string;
};

const ConceptPreviewBase = ({ label, definition, uri, goToDataNorgeText, children }: ConceptPreviewProps) => {
    return (
        <>
            <Popover
                portal
                placement='bottom'
            >
                <Popover.Trigger asChild>{children}</Popover.Trigger>
                <Popover.Content>
                    {label}
                    <Divider />
                    {definition}
                    <Divider />
                    <Link
                        external
                        href={uri}
                    >
                        {goToDataNorgeText}
                    </Link>
                </Popover.Content>
            </Popover>
        </>
    );
};

export default ConceptPreviewBase;
