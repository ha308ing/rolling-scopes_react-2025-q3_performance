import { useState } from "react";
import useData from "@/hooks/useData";
import type { YearRecordFields } from "@/types/yearRecordFields";
import Modal from "@/common/Modal";
import ColumnSelector from "@/common/ColumnSelector";
import YearSelector from "@/common/YearSelector";
import CountryInput from "@/common/CountryInput";
import SortSelector from "@/common/SortSelector";
import { SORT_VALUES, type SortValues } from "@/constants/sortValues";
import { REQUIRED_FIELDS } from "@/constants/requiredFields";

function Countries() {
  const { data } = useData();
  const [columns, setColumns] = useState<YearRecordFields[]>(REQUIRED_FIELDS);
  const [isModal, setIsModal] = useState(false);

  const [yearFilter, setYearFilter] = useState<string>();
  const [countryFilter, setCountryFilter] = useState<string>();
  const [sortValue, setSortValue] = useState<SortValues>();

  const _countries = data
    ? Object.entries(data)
        .filter(([country]) => {
          if (countryFilter) {
            return country.toLowerCase().includes(countryFilter.toLowerCase());
          } else {
            return true;
          }
        })
        .map(([country, info]) => {
          const { iso_code = "N/A", data } = info;

          const activeRow = yearFilter
            ? data.find((row) => row.year == +yearFilter)
            : data[data.length - 1];

          return {
            country,
            iso_code,
            info: activeRow ?? {},
          };
        })
        .sort((a, b) => {
          if (sortValue === SORT_VALUES.POPULATION_ASC) {
            return (a.info?.population ?? 0) - (b.info?.population ?? 0);
          } else if (sortValue === SORT_VALUES.POPULATION_DESC) {
            return (b.info?.population ?? 0) - (a.info?.population ?? 0);
          } else if (sortValue === SORT_VALUES.COUNTRY_ASC) {
            return a.country.localeCompare(b.country);
          } else if (sortValue === SORT_VALUES.COUNTRY_DESC) {
            return b.country.localeCompare(a.country);
          }
          return 0;
        })
    : [];

  return (
    <>
      <div className="box is-flex is-justify-content-center is-align-items-start is-gap-2">
        <CountryInput value={countryFilter} onChange={setCountryFilter} />
        <YearSelector value={yearFilter} onChange={setYearFilter} />
        <SortSelector value={sortValue} onChange={setSortValue} />
        <button
          className="button"
          onClick={() => setIsModal(true)}
          type="button"
        >
          Select Columns
        </button>
      </div>

      <div className="table-container">
        <table className="table is-bordered is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>country</th>
              <th>code</th>
              {columns.map((column) => (
                <th key={"th_" + column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {_countries.map((country, index) => (
              <tr key={"row_" + index}>
                <td>{country.country}</td>
                <td>{country.iso_code}</td>
                {columns.map((col) => {
                  const value = country.info?.[col] ?? "N/A";

                  return (
                    <td
                      className="td"
                      data-year={yearFilter}
                      key={"td_" + col + yearFilter}
                      data-key={"td_" + col + yearFilter}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModal && (
        <Modal onClose={() => setIsModal(false)}>
          <ColumnSelector
            onSetColumns={(columns) => {
              setColumns(columns);
              setIsModal(false);
            }}
            selectedColumns={columns}
          />
        </Modal>
      )}
    </>
  );
}

export default Countries;
