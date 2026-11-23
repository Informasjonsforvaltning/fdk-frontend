"use client";

import { useMemo } from "react";
import { RadioGroup } from "@fellesdatakatalog/ui";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import { PUBLISHED_DAY_OPTIONS } from "./published";
import { formatPublishedLabel } from "./published/labels";

export type PublishedFilterProps = {
  locale?: LocaleCodes;
  value?: string[];
  onChange?: (value: string[]) => void;
};

const PublishedFilter = ({ locale = "nb", value = [], onChange }: PublishedFilterProps) => {
  const dict = getLocalization(locale).searchPage.searchForm.publishedFilter;
  const selected = value[0] ?? "";

  const options = useMemo(() => {
    const presetKeys: string[] = PUBLISHED_DAY_OPTIONS.map(String);
    const keys = selected && !presetKeys.includes(selected) ? [...presetKeys, selected] : presetKeys;
    return keys.map((key) => ({ value: key, label: formatPublishedLabel(key, dict) }));
  }, [dict, selected]);

  return (
    <RadioGroup
      key={selected || "none"}
      name="published"
      options={options}
      value={selected}
      onChange={(next) => onChange?.(next ? [next] : [])}
    />
  );
};

export default PublishedFilter;
