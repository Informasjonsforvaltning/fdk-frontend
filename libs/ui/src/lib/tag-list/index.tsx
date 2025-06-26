import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

const TagList = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn(styles.tagList, className)} {...props}>
			{children}
		</div>
	);
}

export default TagList;