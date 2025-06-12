'use client';

import { Button, type ButtonProps } from '@digdir/designsystemet-react';

const BackButton = (props: ButtonProps) => {
    return (
        <Button
            onClick={() => window.history.go(-1)}
            {...props}
        />
    );
};

export default BackButton;
