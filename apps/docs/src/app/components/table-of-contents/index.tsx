import slugify from 'slugify';
import cn from 'classnames';

import { Heading } from '@digdir/designsystemet-react';

import { type MdxHeadlineObjectNode } from '../mdx-page/utils';

import styles from '../sidebar/sidebar.module.scss';

const TocList = ({ headlines }: { headlines?: MdxHeadlineObjectNode[] }) => {
    if (!headlines || headlines.length === 0) return null;
    return (
        <ul className={cn(styles.sidebarList, styles.sidebarListFlat)}>
            {headlines.map((headline, index) => {
                const slug = slugify(headline.text, { lower: true, strict: true });
                return (
                    <li key={index}>
                        <a href={`#${slug}`}>{headline.text}</a>
                        <TocList headlines={headline.children} />
                    </li>
                );
            })}
        </ul>
    );
};

const TableOfContents = ({ headlines }: { headlines?: MdxHeadlineObjectNode[] }) => {
    return (
        <nav className={styles.sidebar}>
            <Heading
                level={2}
                size='xs'
            >
                På denne siden:
            </Heading>
            <TocList headlines={headlines} />
        </nav>
    );
};

export default TableOfContents;
