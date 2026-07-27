export type DatasetPreviewTableRow = {
  columns: string[];
};

export type DatasetPreviewTableHeader = {
  columns: string[];
};

export type DatasetPreviewTable = {
  header: DatasetPreviewTableHeader;
  rows: DatasetPreviewTableRow[];
};

export type DatasetPreviewPlain = {
  value: string;
  contentType: string;
};

export type DatasetPreviewData = {
  table?: DatasetPreviewTable | null;
  plain?: DatasetPreviewPlain | null;
};

export const hasDatasetPreviewData = (data: DatasetPreviewData | undefined): boolean =>
  Boolean(data?.table || data?.plain?.value);
