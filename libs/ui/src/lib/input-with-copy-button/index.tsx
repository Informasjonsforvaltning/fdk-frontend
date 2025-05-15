import React from 'react';
import { Textfield } from '@digdir/designsystemet-react';
import CopyButton from '../copy-button';
import styles from './styles.module.scss';

type InputWithCopyButtonProps = {
    value: string;
    inputLabel: string;
    copyLabel: string;
    copiedLabel: string;
};

const InputWithCopyButton = ({
    value,
    inputLabel,
    copyLabel,
    copiedLabel,
    ...props
}: InputWithCopyButtonProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={styles.wrapper}
            {...props}
        >
            <CopyButton
                copyLabel={copyLabel}
                copiedLabel={copiedLabel}
                copyOnClick={value}
            />
            <Textfield
                size='md'
                value={value}
                aria-label={inputLabel}
                readOnly
            />
        </div>
    );
};

export default InputWithCopyButton;
