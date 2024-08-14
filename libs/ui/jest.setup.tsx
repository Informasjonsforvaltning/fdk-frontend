/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
    __esModule: true,
    // eslint-disable-next-line jsx-a11y/alt-text
    default: (props: any) => <img {...props} />,
}));

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: () => jest.fn(),
            replace: () => jest.fn(),
        };
    },
    usePathname() {
        return '';
    },
}));
