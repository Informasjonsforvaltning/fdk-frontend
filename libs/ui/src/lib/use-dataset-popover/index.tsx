'use client';

import React from 'react';
import { Popover } from '@digdir/designsystemet-react';
import UseDatasetPopoverDialog, { type UseDatasetPopoverDialogProps } from './dialog';
import styles from './styles.module.scss';

const UseDatasetPopover = (props: UseDatasetPopoverDialogProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <Popover.TriggerContext>
            <Popover.Trigger data-size='sm'>{props.dictionary.header.useDatasetButton}</Popover.Trigger>
            <Popover
                className={styles.popover}
                data-size='sm'
                placement='bottom-end'
                style={{ maxWidth: 400 }}
            >
                <UseDatasetPopoverDialog {...props} />
            </Popover>
        </Popover.TriggerContext>
    );
};

export default UseDatasetPopover;
export { UseDatasetPopoverDialog };
