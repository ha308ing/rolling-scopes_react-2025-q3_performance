import { REQUIRED_FIELDS } from "@/constants/requiredFields";
import type { YearRecordFields } from "@/types/yearRecordFields";
import { useState } from "react";

interface ColumnSelectorProps {
  selectedColumns: YearRecordFields[];
  onSetColumns: (newSelectedColumns: YearRecordFields[]) => void;
}

const availableColumns: YearRecordFields[] = [
  ...REQUIRED_FIELDS,
  "co2_per_gdp",
  "cumulative_co2",
  "temperature_change_from_co2",
  "cement_co2",
  "cement_co2_per_capita",
  "cumulative_cement_co2",
  "coal_co2",
  "coal_co2_per_capita",
  "cumulative_coal_co2",
  "gas_co2",
  "gas_co2_per_capita",
  "cumulative_gas_co2",
  "methane",
  "oil_co2",
  "oil_co2_per_capita",
  "cumulative_oil_co2",
];

function ColumnSelector({
  selectedColumns,
  onSetColumns,
}: ColumnSelectorProps) {
  const [state, setState] = useState(selectedColumns);

  const handleColumnClick = (column: YearRecordFields) => () => {
    setState((prev) => {
      if (prev.includes(column)) {
        return prev.filter((v) => v != column);
      } else {
        return availableColumns.filter((v) => [...prev, column].includes(v));
      }
    });
  };

  return (
    <div
      style={{
        inlineSize: "500px",
        padding: "1rem",
        display: "flex",
        flexFlow: "column nowrap",
        gap: "3rem",
        alignItems: "center",
      }}
    >
      <ul
        style={{
          display: "flex",
          flexFlow: "row wrap",
          gap: "1rem",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {availableColumns.map((column) => (
          <li key={column}>
            <button
              className="button"
              onClick={handleColumnClick(column)}
              type="button"
              disabled={REQUIRED_FIELDS.includes(column)}
            >
              {state.includes(column) && (
                <span className="icon is-small">
                  <i className="fas fa-check"></i>
                </span>
              )}{" "}
              <span>{column}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSetColumns(Array.from(state))}
        type="button"
        className="button is-primary"
      >
        <span>Save</span>
      </button>
    </div>
  );
}

export default ColumnSelector;
