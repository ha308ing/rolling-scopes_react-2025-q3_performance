export const SORT_VALUES = {
  POPULATION_ASC: "population asc",
  POPULATION_DESC: "population desc",
  COUNTRY_ASC: "country asc",
  COUNTRY_DESC: "country decs",
} as const;

export type SortValues = (typeof SORT_VALUES)[keyof typeof SORT_VALUES];
