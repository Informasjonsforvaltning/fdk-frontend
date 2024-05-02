import 'server-only';

import { Link, ListHeading, ListItem, ListRoot, ListUnordered } from '@digdir/designsystemet-react';
import { LinkObjectType } from '@fdk-frontend/types';
import styles from './footer-column.module.css';

export type ColumnData = {
  heading: string;
  links: LinkObjectType[];
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
      {columnData.links.map((link) => (
        <ListItem key={link.text}>
          {link.undecoratedText}
          {link.href && (
            <Link
              href={link.href}
              className={styles.link}
              target={link.external ? '_blank' : undefined}
              rel='noreferrer'
            >
              {link.text}
            </Link>
          )}
        </ListItem>
      ))}
    </ListUnordered>
  </ListRoot>
);
