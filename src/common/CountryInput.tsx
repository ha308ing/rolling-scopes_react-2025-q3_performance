interface CountryInputProps {
  value?: string;
  onChange: (value: string) => void;
}

function CountryInput({ value, onChange }: CountryInputProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    const value = event.target.value;
    onChange(value);
  };

  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label htmlFor="country_selector" className="label">
          Country:
        </label>
      </div>
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input
              className="input"
              value={value ?? ""}
              onChange={handleChange}
              id="country_selector"
            />
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryInput;
