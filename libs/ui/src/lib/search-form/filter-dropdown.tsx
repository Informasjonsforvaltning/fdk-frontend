import { type ReactNode } from "react";
import { Badge, Dropdown } from "@digdir/designsystemet-react";
import { ChevronDownIcon } from "@navikt/aksel-icons";

import styles from "./search-form.module.scss";

export type FilterDropdownProps = {
  label: ReactNode;
  children: ReactNode;
  filterCount?: number;
};

const FilterDropdown = ({ label, children, filterCount }: FilterDropdownProps) => (
  <Dropdown.TriggerContext>
    <Dropdown.Trigger
      data-size="sm"
      variant="secondary"
    >
      {label}
      {filterCount ? (
        <Badge
          count={filterCount}
          data-size="md"
        />
      ) : null}
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
