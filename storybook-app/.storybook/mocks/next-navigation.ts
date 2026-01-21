// Mock for next/navigation in Storybook
export const useRouter = () => ({
    push: () => {},
    replace: () => {},
    prefetch: () => {},
    back: () => {},
    forward: () => {},
    refresh: () => {},
});

export const usePathname = () => '/en';

