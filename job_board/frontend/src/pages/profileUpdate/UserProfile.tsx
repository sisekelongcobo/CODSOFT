// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Divider,
//   Grid,
//   Link,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";

// const UserProfile = () => {
// //   const {
// //     fullName,
// //     phoneNumber,
// //     emailAddress,
// //     city,
// //     resume,
// //     linkedInProfileLink,
// //     githubProfileLink,
// //     workExperienceJobTitle,
// //     company,
// //     workStartDate,
// //     workEndDate,
// //     responsibilities,
// //     degree,
// //     institution,
// //     completionDate,
// //     projectTitle,
// //     projectLink,
// //     projectDescription,
// //     desiredJobTitle,
// //     preferredLocation,
// //     salaryExpectations,
// //     availability,
// //     skills,
// //   } = data;

//   //fetch data from backend
//     const [data, setdata] = useState();
//     const fetchJobs = () => {
//         const url = import.meta.env.VITE_API_URL + "/jobs/all-jobs";  
//         fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             setdata(data[0]);
//           })
//           .catch((error) => console.error("Error fetching user data:", error)); // Handle errors
//       };

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           {data?.fullName}
//         </Typography>

//         <Typography variant="subtitle1">{data?.emailAddress}</Typography>
//         <Typography variant="subtitle1">{data?.phoneNumber}</Typography>
//         <Typography variant="subtitle1">{data?.city}</Typography>
//         <Button variant="outlined" sx={{ mt: 2 }} href={`/resumes/${resume}`} download>
//           Download Resume
//         </Button>

//         <Divider sx={{ my: 4 }} />

//         <Grid container spacing={4}>
//           {/* LinkedIn & GitHub */}
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6">Professional Links</Typography>
//             <List>
//               <ListItem>
//                 <Link href={linkedInProfileLink} target="_blank">
//                   LinkedIn Profile
//                 </Link>
//               </ListItem>
//               <ListItem>
//                 <Link href={githubProfileLink} target="_blank">
//                   GitHub Profile
//                 </Link>
//               </ListItem>
//             </List>
//           </Grid>

//           {/* Work Experience */}
//           <Grid item xs={12} sm={6}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Work Experience</Typography>
//                 <Typography variant="subtitle1">
//                   {workExperienceJobTitle} at {company}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {new Date(workStartDate).toLocaleDateString()} -{" "}
//                   {new Date(workEndDate).toLocaleDateString()}
//                 </Typography>
//                 <Typography variant="body2">{responsibilities}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Education */}
//           <Grid item xs={12} sm={6}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Education</Typography>
//                 <Typography variant="subtitle1">
//                   {degree}, {institution}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Completed on {new Date(completionDate).toLocaleDateString()}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Project */}
//           <Grid item xs={12} sm={6}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Project</Typography>
//                 <Typography variant="subtitle1">
//                   <Link href={projectLink} target="_blank">
//                     {projectTitle}
//                   </Link>
//                 </Typography>
//                 <Typography variant="body2">{projectDescription}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Job Preferences */}
//           <Grid item xs={12} sm={6}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Job Preferences</Typography>
//                 <Typography variant="body1">
//                   <strong>Desired Job Title:</strong> {desiredJobTitle}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Preferred Location:</strong> {preferredLocation}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Salary Expectations:</strong> {salaryExpectations}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Availability:</strong> {availability}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Skills */}
//           <Grid item xs={12}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Skills</Typography>
//                 <List>
//                   {skills.map((skill, index) => (
//                     <ListItem key={index}>
//                       <ListItemText primary={skill} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default UserProfile;
