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
