import api from "./axios.config";
import { apiHandler } from "./api.handler";
export const createReportedIssue = async (
  location,
  description,
  image = null,
  municipalityLevel,
  municipalitySector
) => {
  return apiHandler(() =>
    api.post("api/reportissue", {
      location: location,
      description: description,
      image: image,
      municipalityLevel: municipalityLevel,
      municipalitySector: municipalitySector,
    })
  );
};

export const getReportedIssue = async (PaginationDto) => {
  return apiHandler(() => api.get("api/reportissue", { PaginationDto }));
};
