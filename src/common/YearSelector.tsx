interface YearSelectorProps {
  value?: string;
  onChange: (value: string) => void;
}

const years = Array.from(new Array(500), (_, i) => 2025 - i).map((year) => (
  <option value={year} key={year}>
    {year}
  </option>
));

function YearSelector({ value, onChange }: YearSelectorProps) {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    event.preventDefault();

    onChange(event.target.value);
  };

  return (
    <div className="select">
      <select value={value} onChange={handleChange}>
        <option value="">default</option>
        {years}
      </select>
    </div>
  );
}

export default YearSelector;
