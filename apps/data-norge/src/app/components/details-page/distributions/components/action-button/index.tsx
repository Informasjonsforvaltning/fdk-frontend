import React from 'react';
import { Button, Link } from '@digdir/designsystemet-react';

const ActionButton = ({ children, uri, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
    return (
        <Button
            asChild
            size='sm'
            variant='secondary'
            color='first'
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
