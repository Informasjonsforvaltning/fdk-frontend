'use client';

import { usePathname } from 'next/navigation'

import Breadcrumbs from '../breadcrumbs';

const DynamicBreadcrumbs = () => {

    const pathname = usePathname()

    return pathname;

    // return (
    //     <Breadcrumbs
    //         baseUri={'/'}
    //         breadcrumbList={[
    //             {
    //                 text: 'Home',
    //                 href: '/'
    //             },
    //             {
    //                 text: 'About',
    //                 href: '/about'
    //             },
    //         ]}
    //     />
    // );
}

export default DynamicBreadcrumbs;