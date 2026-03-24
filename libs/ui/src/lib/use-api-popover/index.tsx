'use client';

import React from 'react';
import { Popover } from '@digdir/designsystemet-react';
import UseApiPopoverContent, { type UseApiPopoverProps } from './content';
import styles from './styles.module.scss';

const UseApiPopover = (props: UseApiPopoverProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <Popover.TriggerContext>
            <Popover.Trigger data-size='sm'>{props.dictionary.header.useApiButton}</Popover.Trigger>
            <Popover
                className={styles.popover}
                data-size='sm'
                placement='bottom-end'
                style={{ maxWidth: 400 }}
            >
                <UseApiPopoverContent {...props} />
            </Popover>
        </Popover.TriggerContext>
    );
};

export default UseApiPopover;
export { UseApiPopoverContent };
