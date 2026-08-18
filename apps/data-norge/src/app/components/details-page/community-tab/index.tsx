import cn from "classnames";
import { Heading, Button, Paragraph, Alert, Table } from "@digdir/designsystemet-react";
import { Profile, type JSONValue } from "@fdk-frontend/types";
import { type LocaleCodes, type Localization } from "@fdk-frontend/localization";
import { Badge, ExternalLink, Hstack, VStack, ScrollShadows, PlaceholderBox } from "@fdk-frontend/ui";
import styles from "./community-tab.module.scss";
import TopicRow from "./components/topic-row";
import InternalLink from "@fdk-frontend/libs/ui/src/lib/internal-link";

export type CommunityTabProps = {
  communityBaseUri: string;
  topics?: JSONValue;
  dictionary: Localization;
  locale: LocaleCodes;
  profile?: Profile;
  baseUri: string;
};

const CommunityTab = ({
  communityBaseUri,
  topics,
  dictionary,
  locale,
  profile = "data.norge",
  baseUri,
}: CommunityTabProps) => {
  return (
    <section className={styles.section}>
      <Heading
        level={2}
        data-size="xs"
        className={styles.heading}
      >
        <Hstack>
          {dictionary.community.title}
          <Badge>{topics.length}</Badge>
        </Hstack>
      </Heading>
      {topics.length ? (
        <ScrollShadows className={styles.tableScroller}>
          <Table
            className={cn("table", styles.table)}
            style={{ minWidth: 600 }}
            hover
          >
            <tbody>
              {topics.map((topic: any) => (
                <TopicRow
                  key={topic.tid}
                  topic={topic}
                  communityBaseUri={communityBaseUri}
                  dictionary={dictionary}
                  locale={locale}
                />
              ))}
            </tbody>
          </Table>
        </ScrollShadows>
      ) : (
        <PlaceholderBox>{dictionary.community.noData}</PlaceholderBox>
      )}
      <Alert className={styles.notice}>
        <VStack>
          <Heading
            level={2}
            data-size="xs"
          >
            {dictionary.community.notice.title}
          </Heading>
          <Paragraph data-size="sm">{dictionary.community.notice.body}</Paragraph>
          <Hstack className={styles.toolbar}>
            <Button
              variant="secondary"
              data-size="sm"
              asChild
            >
              <ExternalLink
                href={communityBaseUri}
                locale={locale}
              >
                {dictionary.community.notice.gotoLink}
              </ExternalLink>
            </Button>
            <Button
              variant="tertiary"
              data-size="sm"
              asChild
            >
              <InternalLink
                href="/docs/community"
                profile={profile}
                baseUri={baseUri}
              >
                {dictionary.community.notice.moreInfo}
              </InternalLink>
            </Button>
          </Hstack>
        </VStack>
      </Alert>
    </section>
  );
};

export default CommunityTab;
