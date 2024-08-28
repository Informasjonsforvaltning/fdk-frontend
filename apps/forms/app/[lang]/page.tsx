'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Index = () => {
    useEffect(() => {
        redirect('/data-hunter');
    }, []);
};

export default Index;
