import { useState } from 'react';
import { Button, type ButtonProps, Tooltip } from '@digdir/designsystemet-react';
import { FilesIcon, CheckmarkCircleFillIcon } from '@navikt/aksel-icons';

import HStack from '../hstack';

type CopyButtonProps = {
    copyLabel: string;
    copiedLabel: string;
    copyOnClick: string;
    buttonProps?: ButtonProps;
};

const CopyButton = ({ copyLabel, copiedLabel, copyOnClick, buttonProps, ...props }: CopyButtonProps) => {
    const [clicked, setClicked] = useState(false);

    const copyToClipboard = (text: string) => {
        setClicked(true);
        navigator.clipboard.writeText(text);
    };

    return (
        <Tooltip
            // @ts-expect-error: ignore complaint that Element cannot be set as content
            content={
                clicked ? (
                    <HStack>
                        <CheckmarkCircleFillIcon
                            color='#D1F4E1'
                            fontSize='1.2em'
                        />
                        {copiedLabel}
                    </HStack>
                ) : (
                    copyLabel
                )
            }
            placement='top'
        >
            <Button
                size='sm'
                variant='secondary'
                onClick={() => copyToClipboard(copyOnClick)}
                onMouseOver={() => setClicked(false)}
                {...buttonProps}
            >
                <FilesIcon aria-hidden />
                <span className={'sr-only'}>{copyLabel}</span>
            </Button>
        </Tooltip>
    );
};

export default CopyButton;
