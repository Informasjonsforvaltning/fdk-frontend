'use client';

import { Label, Tag } from '@digdir/designsystemet-react';
import { HTMLAttributes } from 'react';
import styles from './text-area-label.module.css';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  labelText: string;
  tagText?: string;
}

const LabelWithTag = ({ labelText, tagText, ...rest }: Props) => (
  <span
    {...rest}
    className={styles.contentContainer}
  >
    <Label>{labelText}</Label>
    {tagText && (
      <Tag
        size='small'
        color='second'
        className={styles.tag}
      >
        {tagText}
      </Tag>
    )}
  </span>
);

export { LabelWithTag };
