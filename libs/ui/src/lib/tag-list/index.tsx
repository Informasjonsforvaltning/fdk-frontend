import React from 'react';
import cn from 'classnames';
import { Tag } from '@digdir/designsystemet-react';
import styles from './styles.module.scss';

export type TagListProps = {
    maxTags?: number;
};

const TagList = ({ children, className, maxTags, ...props }: TagListProps & React.HTMLAttributes<HTMLUListElement>) => {
    const childArray = React.Children.toArray(children);
    if (!childArray.length) return null;
    return (
        <ul
            className={cn(styles.tagList, className)}
            {...props}
        >
            {childArray
                .filter((child) => Boolean(child))
                .slice(0, maxTags ?? childArray.length)
                .map((child, i) => (
                    <li key={i}>{child}</li>
                ))}
            {maxTags && maxTags < childArray.length && (
                <li>
                    <Tag className={styles.tagsOmitted}>
                        <span>+{childArray.length - maxTags}</span>
                    </Tag>
                </li>
            )}
        </ul>
    );
};

export default TagList;
