declare module 'react-virtualized' {
    import type { ComponentType, CSSProperties, ReactNode } from 'react';

    export const WindowScroller: ComponentType<{
        children: (params: {
            height: number;
            width: number;
            scrollTop: number;
            scrollLeft: number;
            isScrolling: boolean;
            registerChild: (element: HTMLElement | null) => void;
            onChildScroll?: (params: { scrollTop: number }) => void;
        }) => ReactNode;
        scrollElement?: Window | Element | null;
    }>;

    type ListRowRendererParams = {
        index: number;
        key: string;
        style: CSSProperties;
    };

    export const List: ComponentType<{
        autoHeight?: boolean;
        height: number;
        width: number;
        scrollTop?: number;
        rowCount: number;
        rowHeight: number;
        rowRenderer: (params: ListRowRendererParams) => ReactNode;
        overscanRowCount?: number;
    }>;
}
