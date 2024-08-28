import React from 'react';
import slugify from 'slugify';

import styles from './mdx-heading.module.scss';

interface HeadingProps {
    level: number;
    children: React.ReactNode;
}

const extractText = (children: React.ReactNode): string => {
    return React.Children.toArray(children)
        .map((child) => {
            if (typeof child === 'string') {
                return child;
            }
            if (React.isValidElement(child)) {
                return extractText(child.props.children);
            }
            return '';
        })
        .join('');
};

const MdxHeading = ({ level, children }: MdxHeadingProps) => {
    const textContent = extractText(children);
    const slug = slugify(textContent, { lower: true, strict: true });
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <HeadingTag
            className={styles.mdxHeading}
            id={slug}
        >
            {children}
        </HeadingTag>
    );
};

export default MdxHeading;
