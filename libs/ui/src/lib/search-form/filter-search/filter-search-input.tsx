"use client";

import { type KeyboardEvent } from "react";
import { Search } from "@digdir/designsystemet-react";

import styles from "../search-form.module.scss";

export type FilterSearchInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const preventFormSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") e.preventDefault();
};

const FilterSearchInput = ({ label, value, onChange }: FilterSearchInputProps) => (
  <Search
    className={styles.filterSearch}
    data-size="sm"
  >
    <Search.Input
      aria-label={label}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={preventFormSubmit}
    />
    <Search.Clear />
  </Search>
);

export default FilterSearchInput;
