import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Pagination } from '@mui/material';
import {SearchBar} from '../../components/SearchBar';
import { JobCard } from './JobCard';

const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Corp",
    location: "Cape Town, Western Cape",
    postedDate: "2 days ago",
    jobType: "Full-time",
    workMode: "Hybrid",
    companyDescription: "Tech Corp is a leading technology company focused on delivering innovative solutions. We value creativity, collaboration, and excellence.",
    roleDescription: "As a Software Engineer, you will design and develop software applications. Collaborating with a dynamic team, you will create high-quality products.",
    description: `We are looking for a skilled Software Engineer to join our team. 
      The successful candidate will work on developing high-quality applications 
      and collaborate with other developers, designers, and product managers.`,
    responsibilities: [
      "Develop and maintain software applications",
      "Collaborate with cross-functional teams",
      "Participate in code reviews and contribute to team knowledge sharing",
      "Troubleshoot and debug applications",
    ],
    requirements: [
      "Bachelor’s degree in Computer Science or related field",
      "Experience with JavaScript, React, and Node.js",
      "Strong problem-solving skills",
      "Excellent communication skills",
    ],
  },
  {
    id: 2,
    title: "Marketing Specialist",
    company: "Creative Agency",
    location: "Johannesburg, Gauteng",
    postedDate: "1 week ago",
    jobType: "Contract",
    workMode: "Remote",
    companyDescription: "Creative Agency is a top marketing agency known for developing cutting-edge marketing strategies for various clients.",
    roleDescription: "The Marketing Specialist will work on campaigns to drive brand awareness and engagement for our clients. You’ll be involved in content creation and strategy.",
    description: `We are seeking a creative Marketing Specialist to develop 
      innovative marketing strategies and campaigns for a diverse portfolio of clients.`,
    responsibilities: [
      "Develop and execute marketing campaigns",
      "Create compelling content for digital and print media",
      "Collaborate with clients to understand their needs",
      "Analyze campaign performance and optimize strategies",
    ],
    requirements: [
      "Degree in Marketing, Communications, or a related field",
      "Proficiency in digital marketing tools (e.g., Google Analytics)",
      "Experience in social media management",
      "Strong writing and editing skills",
    ],
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Startup Inc.",
    location: "Durban, KwaZulu-Natal",
    postedDate: "3 days ago",
    jobType: "Full-time",
    workMode: "Onsite",
    companyDescription: "Startup Inc. is a fast-growing company focused on delivering innovative products to solve real-world problems.",
    roleDescription: "The Product Manager will be responsible for guiding the development of new products from concept to launch, working closely with engineering and marketing teams.",
    description: `We are looking for an experienced Product Manager to oversee 
      product development, ensuring alignment with business goals and market needs.`,
    responsibilities: [
      "Define product strategy and roadmap",
      "Work with engineering teams to develop product features",
      "Coordinate with marketing for product launch campaigns",
      "Analyze market trends and customer feedback",
    ],
    requirements: [
      "Proven experience in product management",
      "Ability to lead cross-functional teams",
      "Strong analytical and problem-solving skills",
      "Excellent communication and presentation skills",
    ],
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Big Data Analytics",
    location: "Pretoria, Gauteng",
    postedDate: "4 days ago",
    jobType: "Full-time",
    workMode: "Remote",
    companyDescription: "Big Data Analytics is a global leader in data science, offering data-driven solutions to help businesses make informed decisions.",
    roleDescription: "The Data Scientist will apply machine learning techniques to analyze large datasets and generate actionable insights for business improvement.",
    description: `We are seeking a talented Data Scientist to work with large datasets, 
      applying statistical models and machine learning algorithms to solve complex business problems.`,
    responsibilities: [
      "Analyze large datasets to discover trends",
      "Develop machine learning models",
      "Communicate findings to stakeholders",
      "Collaborate with cross-functional teams",
    ],
    requirements: [
      "Degree in Statistics, Computer Science, or related field",
      "Experience with Python, R, and SQL",
      "Knowledge of machine learning algorithms",
      "Strong communication and problem-solving skills",
    ],
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "DesignPro Studio",
    location: "Sandton, Gauteng",
    postedDate: "5 days ago",
    jobType: "Contract",
    workMode: "Hybrid",
    companyDescription: "DesignPro Studio is a design consultancy that specializes in creating user-centered interfaces for mobile and web applications.",
    roleDescription: "The UI/UX Designer will create intuitive and aesthetically pleasing user interfaces while ensuring a seamless user experience.",
    description: `We are looking for a creative UI/UX Designer to collaborate 
      with developers and clients to design cutting-edge digital experiences.`,
    responsibilities: [
      "Design user interfaces for web and mobile apps",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Stay updated with design trends and best practices",
    ],
    requirements: [
      "Experience with Figma, Sketch, or Adobe XD",
      "Strong portfolio showcasing UI/UX design work",
      "Knowledge of design systems and responsive design",
      "Excellent communication skills",
    ],
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Cloud Solutions",
    location: "Bloemfontein, Free State",
    postedDate: "1 week ago",
    jobType: "Full-time",
    workMode: "Onsite",
    companyDescription: "Cloud Solutions is a leader in cloud computing services, helping businesses transition to scalable and secure cloud infrastructures.",
    roleDescription: "As a DevOps Engineer, you will manage the cloud infrastructure, automate deployments, and ensure the reliability of production environments.",
    description: `We are seeking a DevOps Engineer to maintain and optimize 
      our cloud infrastructure, focusing on automation, monitoring, and security.`,
    responsibilities: [
      "Manage cloud infrastructure (AWS, Azure, GCP)",
      "Automate software deployments and monitoring",
      "Ensure system security and scalability",
      "Collaborate with developers and IT teams",
    ],
    requirements: [
      "Experience with cloud platforms (AWS, Azure, GCP)",
      "Strong understanding of CI/CD pipelines",
      "Familiarity with Docker and Kubernetes",
      "Excellent problem-solving and communication skills",
    ],
  },
  {
    id: 7,
    title: "Financial Analyst",
    company: "FinGroup",
    location: "Port Elizabeth, Eastern Cape",
    postedDate: "1 day ago",
    jobType: "Full-time",
    workMode: "Hybrid",
    companyDescription: "FinGroup is a leading financial services company that provides investment advice and risk management solutions.",
    roleDescription: "The Financial Analyst will analyze financial data, prepare reports, and provide recommendations to improve business performance.",
    description: `We are looking for a Financial Analyst to assess business performance 
      and provide actionable insights to drive financial success.`,
    responsibilities: [
      "Analyze financial statements and forecasts",
      "Prepare reports for senior management",
      "Provide insights on financial performance",
      "Work with departments to improve profitability",
    ],
    requirements: [
      "Degree in Finance or Accounting",
      "Strong analytical and Excel skills",
      "Experience with financial modeling",
      "Excellent communication and reporting skills",
    ],
  },
  {
    id: 8,
    title: "Operations Manager",
    company: "Logistics World",
    location: "East London, Eastern Cape",
    postedDate: "2 weeks ago",
    jobType: "Full-time",
    workMode: "Onsite",
    companyDescription: "Logistics World provides comprehensive logistics and supply chain solutions to clients across various industries.",
    roleDescription: "The Operations Manager will oversee daily operations, manage supply chain logistics, and ensure the efficient flow of goods and services.",
    description: `We are looking for an experienced Operations Manager to manage 
      logistics and supply chain operations, ensuring timely delivery of goods.`,
    responsibilities: [
      "Oversee daily logistics operations",
      "Ensure efficient supply chain processes",
      "Collaborate with vendors and suppliers",
      "Manage logistics staff and warehouse operations",
    ],
    requirements: [
      "Experience in logistics and supply chain management",
      "Strong leadership and organizational skills",
      "Knowledge of logistics software",
      "Ability to manage a large team",
    ],
  },
  {
    id: 9,
    title: "Human Resources Manager",
    company: "PeopleFirst",
    location: "Polokwane, Limpopo",
    postedDate: "3 days ago",
    jobType: "Full-time",
    workMode: "Hybrid",
    companyDescription: "PeopleFirst is a HR consulting firm specializing in employee relations, talent acquisition, and workplace culture enhancement.",
    roleDescription: "The HR Manager will manage recruitment, employee relations, and performance management to ensure a positive work environment.",
    description: `We are seeking an HR Manager to lead our human resources department, 
      focusing on recruitment, employee relations, and enhancing workplace culture.`,
    responsibilities: [
      "Oversee recruitment and hiring processes",
      "Manage employee relations and conflict resolution",
      "Develop and implement HR policies",
      "Lead performance management initiatives",
    ],
    requirements: [
      "Degree in Human Resources or a related field",
      "Experience in recruitment and employee relations",
      "Strong communication and leadership skills",
      "Knowledge of labor laws and HR policies",
    ],
  }
];


const jobsPerPage = 6;

export const JobListingsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          Job Listings
        </Typography> 
        <Box sx={{ mb: 4 }}>
          <SearchBar />
        </Box>

        <Grid container spacing={4}>
          {currentJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination
            count={Math.ceil(jobs.length / jobsPerPage)} 
            page={currentPage} 
            onChange={handlePageChange} 
            color="primary"
          />
        </Box>
      </Container>
    </>
  );
};
