export default class reportIssueDto {
  constructor(
    location,
    description,
    image,
    status,
    municipalityLevel,
    municipalitySector,
    
  ) {
    this.Location = location, 
      this.Description = description,
      this.Image = image, 
      this.Status = status,
      this.MunicipalityLevel = municipalityLevel,
      this.MunicipalitySector = municipalitySector
  }
}
