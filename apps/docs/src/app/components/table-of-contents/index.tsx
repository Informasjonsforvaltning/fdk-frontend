import slugify from 'slugify';
import cn from 'classnames';

import { Heading } from '@digdir/designsystemet-react';
import { type Dictionary } from '@fdk-frontend/dictionaries';

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

type TableOfContentsProps = {
    dictionary: Dictionary;
    headlines?: MdxHeadlineObjectNode[];
};

const TableOfContents = ({ headlines, dictionary }: TableOfContentsProps) => (
    <aside
        className={styles.sidebar}
        aria-labelledby='tableOfContents.onThisPage'
    >
        <Heading
            id='tableOfContents.onThisPage'
            level={2}
            size='xs'
        >
            {dictionary.tableOfContents.onThisPage}
        </Heading>
        <TocList headlines={headlines} />
    </aside>
);

export default TableOfContents;
