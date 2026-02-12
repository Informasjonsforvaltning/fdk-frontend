import type { CSSProperties, ReactNode } from 'react';

declare module 'react-syntax-highlighter-virtualized-renderer' {
    type VirtualizedRendererOptions = {
        overscanRowCount?: number;
        rowHeight?: number;
    };
    function createVirtualizedRenderer(
        options?: VirtualizedRendererOptions,
    ): (props: {
        rows: unknown[];
        stylesheet: Record<string, CSSProperties>;
        useInlineStyles: boolean;
    }) => ReactNode;
    export default createVirtualizedRenderer;
}
