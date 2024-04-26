import 'server-only';

import { ListHeading, ListItem, ListRoot, ListUnordered } from '@digdir/designsystemet-react';
import { Link } from '../../../link';
import styles from './footer-column.module.css';

export type FooterLinkItemType = {
  text?: string;
  undecoratedText?: string;
  href?: string;
  external?: boolean;
};

export type ColumnData = {
  heading: string;
  links: FooterLinkItemType[];
};

export type FooterColumnProps = {
  columnData: ColumnData;
};

export const FooterColumn = ({ columnData }: FooterColumnProps) => (
  <ListRoot size='small'>
    <ListHeading
      size='xxsmall'
      className={styles.listHeading}
    >
      {columnData.heading}
    </ListHeading>
    <ListUnordered className={styles.linkContainer}>
      {columnData.links.map((link: FooterLinkItemType) => (
        <ListItem key={link.text}>
          {link.undecoratedText}
          {link.href && (
            <Link
              href={link.href}
              className={styles.link}
              external={link.external}
            >
              {link.text}
            </Link>
          )}
        </ListItem>
      ))}
    </ListUnordered>
  </ListRoot>
);
