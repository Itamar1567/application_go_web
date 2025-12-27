enum ApplicationStatus{
    Applied = 0,
    Interviewed = 1,
    Accepted = 2,
    Rejected = 3
}

enum ApplicationType {
  FullTime = 0,
  PartTime = 1,
  Internship = 2,
  Contract = 3,
}

enum ApplicationLocation {
  OnSite = 0,
  Hybrid = 1,
  Remote = 2,
}

export interface ToDoApplication {
  id?: number;
  userId?: string;
  companyName: string;
  status: ApplicationStatus;
  type: ApplicationType;
  dateApplied?: string;
  lastUpdated?: string;
  location: ApplicationLocation;
  role?: string | null;
  country?: string | null;
  state?: string | null;
  salary?: number | null;
  companyUrl?: string | null; 
}
