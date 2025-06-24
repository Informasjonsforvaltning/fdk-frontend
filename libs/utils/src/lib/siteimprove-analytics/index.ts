export enum EventCategory {
    DETAILS_PAGE = 'Details page',
}

export enum EventAction {
    CLICK = 'Click',
}

export enum EventLabel {
    REQUEST_ACCESS_BUTTON = 'Request access button',
    SHOW_DATASET_PREVIEW_BUTTON = 'Show dataset preview button',
    USE_DATASET_BUTTON = 'Use dataset button',
}

type SiteImproveEventProps = {
    category: EventCategory;
    action: EventAction;
    label?: EventLabel | string | undefined;
};

export const trackSiteImproveEvent = ({ category, action, label }: SiteImproveEventProps) => {
    if ((window as any)._sz === undefined) {
        // eslint-disable-next-line no-console
        console.error('Unable to find Site Improve event library.');
    } else if (label) {
        (window as any)._sz.push(['event', category, action, label]);
    } else {
        (window as any)._sz.push(['event', category, action]);
    }
};
