import { Chip } from "@digdir/designsystemet-react";

export type FilterChipsProps = {
  selectedFilters: string[];
  onChipRemove: (value: string[]) => void;
  chipLabels: Record<string, string>;
};

const FilterChips = ({ selectedFilters, onChipRemove, chipLabels }: FilterChipsProps) => {
  function handleChipClick(chipValue: string) {
    const filteredArray = selectedFilters.filter((item) => item !== chipValue); // creates a new (filtered) instance of the array
    onChipRemove(filteredArray);
  }

  return (
    <>
      {selectedFilters.map((filterKey) => (
        <Chip.Removable
          onClick={() => handleChipClick(filterKey)}
          key={filterKey}
          data-size="sm"
        >
          {chipLabels[filterKey] ?? filterKey}
        </Chip.Removable>
      ))}
    </>
  );
};

export default FilterChips;
