import React from 'react';
import { Textfield } from '@digdir/designsystemet-react';
import { CopyButton } from '@fellesdatakatalog/ui';
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
            <Textfield
                className={styles.input}
                data-size='md'
                value={value}
                aria-label={inputLabel}
                readOnly
            />
            <CopyButton
                className={styles.button}
                copyLabel={copyLabel}
                copiedLabel={copiedLabel}
                copyOnClick={value}
            />
        </div>
    );
};

export default InputWithCopyButton;
