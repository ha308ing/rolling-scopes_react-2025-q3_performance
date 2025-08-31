import { useSuspenseQuery } from "@tanstack/react-query";
import type { DataResponse } from "../types/dataResponse";

const useData = () => {
  return useSuspenseQuery<DataResponse>({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch(
        "https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json",
        // "/data.json",
      );

      if (response.ok) {
        return response.json() as Promise<DataResponse>;
      } else {
        throw new Error("Network response was not ok");
      }
    },
  });
};

export default useData;
