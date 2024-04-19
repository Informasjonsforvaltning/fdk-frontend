'use client';

import { type ButtonProps, Button, Paragraph } from '@digdir/designsystemet-react';
import { useFormStatus } from 'react-dom';
import cn from 'classnames';
import styles from './button-submit.module.css';

type Props = {
  buttonText: string;
  extendedClassName?: string;
} & ButtonProps;

const SubmitButton = ({ buttonText, extendedClassName }: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn(styles.button, extendedClassName)}
      type='submit'
      aria-disabled={pending}
    >
      <Paragraph>{buttonText}</Paragraph>
    </Button>
  );
};

export { SubmitButton };
