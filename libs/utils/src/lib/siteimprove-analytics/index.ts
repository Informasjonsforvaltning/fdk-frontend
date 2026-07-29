export enum EventCategory {
  DETAILS_PAGE = "Details page",
}

export enum EventAction {
  CLICK = "Click",
}

export enum EventLabel {
  REQUEST_ACCESS_BUTTON = "Request access button",
  SHOW_DATASET_PREVIEW_BUTTON = "Show dataset preview button",
  USE_DATASET_BUTTON = "Use dataset button",
  USE_API_BUTTON = "Use API button",
}

type SiteImproveEventProps = {
  category: EventCategory;
  action: EventAction;
  label?: EventLabel | string | undefined;
};

export const trackSiteImproveEvent = ({ category, action, label }: SiteImproveEventProps) => {
  // The Siteimprove library is only present once the visitor consents to statistics.
  // Without consent `_sz` is undefined, so events are silently dropped.
  const sz = (window as any)._sz;
  if (sz === undefined) {
    return;
  }
  if (label) {
    sz.push(["event", category, action, label]);
  } else {
    sz.push(["event", category, action]);
  }
};
