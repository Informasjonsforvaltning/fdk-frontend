// eslint-disable-next-line
import { Paragraph, Heading, Alert, Link, Button } from '@digdir/designsystemet-react';
import { getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import HStack from '@fdk-frontend/ui/hstack';
import VStack from '@fdk-frontend/ui/vstack';
import BackButton from '@fdk-frontend/ui/back-button';
import Markdown from '@fdk-frontend/ui/markdown';
import styles from './styles.module.scss';

export type LeavingGatewayPageProps = {
    params: Promise<{
        lang: LocaleCodes;
    }>;
    searchParams?: Promise<{
        url: string;
    }>;
};

const LeavingGatewayPage = async (props: LeavingGatewayPageProps) => {
    const { lang } = await props.params;
    const { url } = (await props.searchParams) || {};

    const dictionary = await getDictionary(lang, 'common');

    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <Heading
                    level={2}
                    size='sm'
                >
                    {dictionary.leavingGateway.heading}
                </Heading>
                <VStack>
                    <Paragraph size='sm'>{dictionary.leavingGateway.linkLabel}</Paragraph>
                    <div className={styles.urlBox}>
                        <Link href={url}>{url}</Link>
                    </div>
                </VStack>
                <Alert size='sm'>
                    <Markdown>{dictionary.leavingGateway.alertText}</Markdown>
                </Alert>
                <HStack>
                    <BackButton
                        size='sm'
                        variant='secondary'
                    >
                        {dictionary.leavingGateway.abortButton}
                    </BackButton>
                    <Button
                        asChild
                        size='sm'
                        variant='primary'
                    >
                        <Link href={url}>{dictionary.leavingGateway.continueButton}</Link>
                    </Button>
                </HStack>
            </div>
        </div>
    );
};

export const generateMetadata = async (props: LeavingGatewayPageProps) => {
    const params = await props.params;
    const dictionary = await getDictionary(params.lang, 'common');

    return {
        title: `${dictionary.leavingGateway.heading} - data.norge.no`,
    };
};

export default LeavingGatewayPage;
