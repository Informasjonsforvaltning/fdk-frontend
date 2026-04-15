/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';

// Some UI deps (Digdir designsystemet) expect the browser `CSS.supports` API.
// Jest's jsdom environment doesn't provide it by default.
if (globalThis.CSS === undefined) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    (globalThis as unknown as { CSS: { supports: (property: string, value?: string) => boolean } }).CSS = {
        supports: () => true,
    };
} else if (typeof globalThis.CSS.supports !== 'function') {
    globalThis.CSS.supports = () => true;
}

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
