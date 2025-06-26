import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

const TagList = ({ children, className, ...props }: React.HTMLAttributes<HTMLUListElement>) => {
    return (
        <ul
            className={cn(styles.tagList, className)}
            {...props}
        >
            {React.Children.toArray(children)
                .filter((child) => Boolean(child))
                .map((child, i) => (
                    <li key={i}>{child}</li>
                ))}
        </ul>
    );
};

export default TagList;
