import { Paragraph, Heading, Alert, Link, Button } from '@digdir/designsystemet-react';
import { getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { Hstack, VStack, BackButton, Markdown } from '@fdk-frontend/ui';
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
                    data-size='sm'
                >
                    {dictionary.leavingGateway.heading}
                </Heading>
                <VStack>
                    <Paragraph data-size='sm'>{dictionary.leavingGateway.linkLabel}</Paragraph>
                    <div className={styles.urlBox}>
                        <Link href={url}>{url}</Link>
                    </div>
                </VStack>
                <Alert data-size='sm'>
                    <Markdown>{dictionary.leavingGateway.alertText}</Markdown>
                </Alert>
                <Hstack>
                    <BackButton
                        data-size='sm'
                        variant='secondary'
                    >
                        {dictionary.leavingGateway.abortButton}
                    </BackButton>
                    <Button
                        asChild
                        data-size='sm'
                        variant='primary'
                    >
                        <Link href={url}>{dictionary.leavingGateway.continueButton}</Link>
                    </Button>
                </Hstack>
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
