import slugify from "slugify";
import { Heading } from "@digdir/designsystemet-react";

import { NavLinkList, type NavLinkListItem } from "@fdk-frontend/ui";
import { type Localization } from "@fdk-frontend/localization";

import { type MdxHeadlineObjectNode } from "../mdx-page/utils";

import styles from "./table-of-contents.module.scss";

const toLinkItems = (headlines: MdxHeadlineObjectNode[] | undefined, prefix = ""): NavLinkListItem[] =>
  (headlines ?? []).map((headline, index) => {
    const slug = slugify(headline.text, { lower: true, strict: true });
    const id = prefix ? `${prefix}.${index}` : String(index);
    return {
      id,
      href: `#${slug}`,
      label: headline.text,
      children: headline.children?.length ? toLinkItems(headline.children, id) : undefined,
    };
  });

type TableOfContentsProps = {
  dictionary: Localization;
  headlines?: MdxHeadlineObjectNode[];
};

const TableOfContents = ({ headlines, dictionary }: TableOfContentsProps) => (
  <nav
    className={styles.tableOfContents}
    aria-labelledby="tableOfContents.onThisPage"
  >
    <Heading
      id="tableOfContents.onThisPage"
      level={2}
      data-size="xs"
    >
      {dictionary.tableOfContents.onThisPage}
    </Heading>
    <NavLinkList items={toLinkItems(headlines)} />
  </nav>
);

export default TableOfContents;
