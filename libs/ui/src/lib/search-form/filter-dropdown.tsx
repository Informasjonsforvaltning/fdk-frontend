import { type ReactNode } from "react";
import { Dropdown } from "@digdir/designsystemet-react";
import { ChevronDownIcon } from "@navikt/aksel-icons";

import styles from "./search-form.module.scss";

export type FilterDropdownProps = {
  label: ReactNode;
  children: ReactNode;
};

const FilterDropdown = ({ label, children }: FilterDropdownProps) => (
  <Dropdown.TriggerContext>
    <Dropdown.Trigger
      data-size="sm"
      variant="secondary"
    >
      {label}
      <ChevronDownIcon />
    </Dropdown.Trigger>
    <Dropdown
      className={styles.filterDropdown}
      placement="bottom-start"
      data-size="sm"
    >
      {children}
    </Dropdown>
  </Dropdown.TriggerContext>
);

export default FilterDropdown;
