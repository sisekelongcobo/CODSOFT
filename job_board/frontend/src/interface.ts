export interface Job {
  jobId?: number;
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

export interface Applicant {
  id: number;
  jobTitle: string;
  fullName: string;
  status: string;
  appliedDate: string;
}

export interface UserProfile {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  city: string;
  resume: string; 
  linkedInProfileLink: string;
  githubProfileLink: string;

  experience: Experience[];
  skills: string[];

  education: Education[];
  
  projects: Project[];
}

export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string; 
  endDate: string;   
  responsibilities: string; 
}

export interface Education {
  degree: string;
  institution: string;
  completionDate: string;
}

export interface Project {
  title: string;
  link: string; 
  description: string;
}

export interface UploadedFile {
  url: string;
  downloadUrl: string;
  pathname: string;
  contentType: string;
  contentDisposition: string;
}

