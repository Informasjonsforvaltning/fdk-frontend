import React from 'react';
import { Button, type ButtonProps, Link } from '@digdir/designsystemet-react';

type ActionButtonProps = {
    uri: string;
};

const ActionButton = ({ children, uri, ...props }: ActionButtonProps & ButtonProps) => {
    return (
        <Button
            asChild
            data-size='sm'
            variant='secondary'
            onClick={(e) => {
                e.stopPropagation();
            }}
            {...props}
        >
            <Link href={uri}>{children}</Link>
        </Button>
    );
};

export default ActionButton;
