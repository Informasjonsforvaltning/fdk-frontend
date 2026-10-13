import React from "react";
import cn from "classnames";
import {
  Card,
  CardBlock,
  type CardProps,
  Heading,
  type HeadingProps,
  Link,
  Paragraph,
  Skeleton,
} from "@digdir/designsystemet-react";
import styles from "./styles.module.scss";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

export type DocsTeaserProps = {
  locale: LocaleCodes;
  title?: string;
  desc?: string;
  href?: string;
  headingLevel?: HeadingProps["level"];
};

const DocsTeaser = ({
  className,
  locale,
  title,
  desc,
  href,
  headingLevel = 3,
  ...rest
}: DocsTeaserProps & Partial<CardProps>) => {
  const localization = getLocalization(locale);
  const docsTitles = localization.docs?.titles;
  const firstSegment = href?.split("/")[2];
  const sectionTitle = firstSegment && docsTitles ? docsTitles[`/${firstSegment}`] : undefined;

  return (
    <Card
      className={cn(styles.container, className)}
      {...rest}
    >
      <CardBlock>
        {title ? (
          <div>
            <Heading level={headingLevel}>
              <Link href={href ?? `/${locale}/docs`}>{title}</Link>
            </Heading>
          </div>
        ) : (
          <Skeleton
            variant="rectangle"
            height="1.5rem"
            width="300px"
          />
        )}
        {href ? (
          <Paragraph className={styles.description}>
            {desc
              ? desc.length > 500
                ? `${desc.slice(0, 500)}...`
                : desc
              : localization.common.teaser.missingDescription}
          </Paragraph>
        ) : (
          <div style={{ marginTop: "0.5rem", lineHeight: "1.75rem" }}>
            <Skeleton
              variant="text"
              width={300}
            />
          </div>
        )}
        {href && <div className={styles.orgName}>{sectionTitle ?? firstSegment}</div>}
      </CardBlock>
    </Card>
  );
};

export default DocsTeaser;
