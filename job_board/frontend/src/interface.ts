export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  jobType: string; // e.g., Full-time, Contract
  workMode: string; // e.g., Onsite, Remote, Hybrid
  companyDescription: string;
  roleDescription: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}
