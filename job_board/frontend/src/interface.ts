export interface Job {
  jobId: number;
  userId: string;
  title: string;
  company: string;
  location: string;
  jobType: string; 
  workMode: string;
  companyDescription: string;
  roleDescription: string;
  jobDescription: string;
  responsibilities: string[];
  requirements: string[];
  createdAt: string;


  status?: string;
  appliedDate?: string;
}

export interface JobCardProps {
  job: Job;
}