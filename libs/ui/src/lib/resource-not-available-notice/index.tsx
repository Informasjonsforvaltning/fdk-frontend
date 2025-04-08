import React from 'react';
import { Alert, type AlertProps, Heading, Paragraph, Button, Link } from '@digdir/designsystemet-react';
import VStack from '../vstack';
import HStack from '../hstack';
import AccessRequestButton, { type AccessRequestButtonProps } from '../access-request-button';
// import styles from './resource-not-available-notice.module.scss';

const ResourceNotAvailableNotice = ({
    children,
    className,
    kind,
    id,
    dictionary,
    ...props
}: AccessRequestButtonProps & AlertProps) => {
    return (
        <div className={className}>
            <Alert
                severity='warning'
                {...props}
            >
                <VStack style={{ marginBottom: '0.66666rem', gap: '0.5rem' }}>
                    <Heading
                        level={2}
                        size='xxsmall'
                    >
                        {dictionary.resourceNotAvailableNotice.title}
                    </Heading>
                    <Paragraph size='sm'>{dictionary.resourceNotAvailableNotice.body}</Paragraph>
                    <HStack>
                        <AccessRequestButton
                            kind={kind}
                            id={id}
                            dictionary={dictionary}
                            isAvailable={false}
                        />
                        <Button
                            variant='tertiary'
                            size='sm'
                            asChild
                        >
                            <Link href='/docs/finding-data/access-data#nasjonal-soknadslosning'>
                                {dictionary.resourceNotAvailableNotice.moreInfoLink}
                            </Link>
                        </Button>
                    </HStack>
                </VStack>
            </Alert>
        </div>
    );
};

export default ResourceNotAvailableNotice;
