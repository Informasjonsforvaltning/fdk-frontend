import { Chip } from "@digdir/designsystemet-react";

export type FilterChipsProps = {
  selectedFilters: string[];
  onChipRemove: (value: string[]) => void;
  // TODO: display filter labels
};

const FilterChips = ({ selectedFilters, onChipRemove }: FilterChipsProps) => {
  function handleChipClick(chipValue: string) {
    const filteredArray = selectedFilters.filter((item) => item !== chipValue);
    onChipRemove(filteredArray);
  }
  return (
    <>
      {selectedFilters.map((filter) => (
        <Chip.Removable
          onClick={() => handleChipClick(filter)}
          key={filter}
        >
          {filter}
        </Chip.Removable>
      ))}
    </>
  );
};

export default FilterChips;
