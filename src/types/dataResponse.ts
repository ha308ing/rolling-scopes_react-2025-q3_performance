import type { YearRecord } from "./yearRecord";

export type DataResponse = Record<
  string,
  { iso_code?: string; data: YearRecord[] }
>;
