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
  jobDescription: string;
  responsibilities: string[];
  requirements: string[];
  createdAt: string;
}

export interface JobCardProps {
  job: Job;
}