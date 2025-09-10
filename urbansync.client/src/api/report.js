import { apiHandler } from "./api.handler";

export const createReportedIssue = async (
  location,
  description,
  image = null,
  municipalityLevel,
  municipalitySector
) => {
  // Create an array with a single object
  const payload = [
    {
      location: location,
      description: description,
      image: image,

      municipalityLevel: municipalityLevel,
      municipalitySector: municipalitySector,
      dateOfCreation: new Date().toISOString(), // current date/time
    },
  ];

  return apiHandler(() => api.post("api/reportissue", payload));
};

export const getReportedIssue = async (PaginationDto) => {
  return apiHandler(() => api.get("api/authreportissue", { PaginationDto }));
};
