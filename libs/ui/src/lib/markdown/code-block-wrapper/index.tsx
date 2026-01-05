'use client';

import { Prism as SyntaxHighlighter, type SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton } from '@fellesdatakatalog/ui';
import { type LocaleCodes } from '@fdk-frontend/dictionaries';
import styles from './code-block-wrapper.module.scss';

type CodeBlockWrapperProps = SyntaxHighlighterProps & {
    locale: LocaleCodes;
};

const copyLabels: Record<LocaleCodes, { copy: string; copied: string }> = {
    nb: { copy: 'Kopier', copied: 'Kopiert!' },
    nn: { copy: 'Kopier', copied: 'Kopiert!' },
    en: { copy: 'Copy', copied: 'Copied!' },
};

const CodeBlockWrapper = ({ locale, children, ...rest }: CodeBlockWrapperProps) => {
    const codeString = typeof children === 'string' ? children : String(children);
    const labels = copyLabels[locale] || copyLabels.en;

    return (
        <div className={styles.wrapper}>
            <div className={styles.copyButton}>
                <CopyButton
                    copyLabel={labels.copy}
                    copiedLabel={labels.copied}
                    copyOnClick={codeString}
                    data-color-scheme='dark'
                    icon
                />
            </div>
            <div className={styles.scrollContainer}>
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    PreTag='div'
                    tabIndex={0}
                    {...rest}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlockWrapper;
