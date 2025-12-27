// Sent when creating
export interface ToCreateApplication {
  companyName: string;
  status: number;
  type: number;
  dateApplied?: string;
  location: number;
  role: string;
  country?: string;
  state?: string;
  salary?: number;
  companyUrl?: string; 
}

// Sent when updating
export interface ToUpdateApplicationDTO {
  companyName?: string;
  status?: number;
  type?: number;
  dateApplied?: string;
  lastUpdated?: string;
  location?: number;
  role?: string;
  country?: string;
  state?: string;
  salary?: number;
}

// Received from backend
export interface ToGetApplication {
  id: number;
  companyName: string;
  status: number;
  type: number;
  dateApplied?: string;
  lastUpdated?: string;
  location: number;
  role?: string;
  country?: string;
  state?: string;
  salary?: number;
}