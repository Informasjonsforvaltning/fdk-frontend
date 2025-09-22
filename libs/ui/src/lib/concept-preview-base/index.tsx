'use client';

import { PropsWithChildren } from 'react';
import { Divider, Popover, Link } from '@digdir/designsystemet-react';

type ConceptPreviewProps = PropsWithChildren & {
    label: string;
    definition: string;
    uri: string;
    goToDataNorgeText: string;
};

const ConceptPreviewBase = ({ label, definition, uri, goToDataNorgeText, children }: ConceptPreviewProps) => {
    return (
        <>
            <Popover.TriggerContext>
                <Popover.Trigger asChild>{children}</Popover.Trigger>
                <Popover placement='bottom'>
                    {label}
                    <Divider />
                    {definition}
                    <Divider />
                    <Link href={uri}>{goToDataNorgeText}</Link>
                </Popover>
            </Popover.TriggerContext>
        </>
    );
};

export default ConceptPreviewBase;
