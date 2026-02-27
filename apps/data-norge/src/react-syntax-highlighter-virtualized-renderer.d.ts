/* eslint-disable no-undef */
/// <reference types="react" />

declare module 'react-syntax-highlighter-virtualized-renderer' {
    type VirtualizedRendererOptions = {
        overscanRowCount?: number;
        rowHeight?: number;
    };
    function createVirtualizedRenderer(
        options?: VirtualizedRendererOptions,
    ): (props: {
        rows: unknown[];
        stylesheet: Record<string, React.CSSProperties>;
        useInlineStyles: boolean;
    }) => React.ReactNode;
    export default createVirtualizedRenderer;
}
