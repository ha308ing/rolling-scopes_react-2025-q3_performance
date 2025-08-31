import { type SortValues, SORT_VALUES } from "@/constants/sortValues";

interface SortSelectorProps {
  value?: SortValues;
  onChange: (value: SortValues) => void;
}

function SortSelector({ value, onChange }: SortSelectorProps) {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();

    onChange(e.target.value as SortValues);
  };

  return (
    <div className="select">
      <select value={value} onChange={handleChange}>
        <option value="">default</option>
        {Object.values(SORT_VALUES).map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelector;
