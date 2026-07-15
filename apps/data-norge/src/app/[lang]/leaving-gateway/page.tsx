// eslint-disable-next-line
import { Paragraph, Heading, Alert, Link, Button } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import { Hstack, VStack, BackButton, Markdown } from "@fdk-frontend/ui";
import { getProfile } from "@fdk-frontend/utils/server";
import styles from "./styles.module.scss";

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

  const dictionary = getLocalization(lang).common;
  const profile = await getProfile();

  const gateway = dictionary.leavingGateway;
  const isTransportportal = profile === "transportportal";
  const heading = isTransportportal ? gateway.transportportal.heading : gateway.heading;
  const alertText = isTransportportal ? gateway.transportportal.alertText : gateway.alertText;
  const abortButton = isTransportportal ? gateway.transportportal.abortButton : gateway.abortButton;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Heading
          level={2}
          data-size="sm"
        >
          {heading}
        </Heading>
        <VStack>
          <Paragraph data-size="sm">{gateway.linkLabel}</Paragraph>
          <div className={styles.urlBox}>
            <Link href={url}>{url}</Link>
          </div>
        </VStack>
        <Alert data-size="sm">
          <Markdown>{alertText}</Markdown>
        </Alert>
        <Hstack>
          <BackButton
            data-size="sm"
            variant="secondary"
          >
            {abortButton}
          </BackButton>
          <Button
            asChild
            data-size="sm"
            variant="primary"
          >
            <Link href={url}>{gateway.continueButton}</Link>
          </Button>
        </Hstack>
      </div>
    </div>
  );
};

export const generateMetadata = async (props: LeavingGatewayPageProps) => {
  const params = await props.params;
  const dictionary = getLocalization(params.lang).common;
  const profile = await getProfile();

  const heading =
    profile === "transportportal"
      ? dictionary.leavingGateway.transportportal.heading
      : dictionary.leavingGateway.heading;

  return {
    title: `${heading} - data.norge.no`,
  };
};

export default LeavingGatewayPage;
