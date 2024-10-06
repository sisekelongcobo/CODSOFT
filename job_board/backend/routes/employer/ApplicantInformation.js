import express from "express";

const router = express.Router();

router.get("/applicant-information/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const query = `
        SELECT 
            p.fullName,
            p.phoneNumber,
            p.emailAddress,
            p.city,
            p.resume,
            p.linkedInProfileLink,
            p.githubProfileLink,
            w.experienceId,
            w.jobTitle,
            w.company,
            w.startDate,
            w.endDate,
            w.responsibilities,
            s.skills,
            e.educationId,
            e.degree,
            e.institution,
            e.completionDate,
            j.desiredJobTitle,
            j.preferredLocation,
            j.salaryExpectations,
            j.availability,
            pr.projectId,
            pr.projectTitle,
            pr.projectLink,
            pr.projectDescription
        FROM 
            personal_information p
        LEFT JOIN 
            work_experience w ON p.userId = w.userId
        LEFT JOIN 
            skills s ON p.userId = s.userId
        JOIN 
            education e ON p.userId = e.userId
        LEFT JOIN 
            job_preferences j ON p.userId = j.userId
        LEFT JOIN 
            portfolio pr ON p.userId = pr.userId
        WHERE 
            p.userId = ?`;

    const [rows] = await req.db.promise().query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    // Initialize the response structure
    const response = {
      fullName: rows[0].fullName,
      phoneNumber: rows[0].phoneNumber,
      emailAddress: rows[0].emailAddress,
      city: rows[0].city,
      resume: rows[0].resume,
      linkedInProfileLink: rows[0].linkedInProfileLink,
      githubProfileLink: rows[0].githubProfileLink,
      skills: rows[0].skills,
      experience: [],

      education: [],
      projects: [],
    };

    // Create a set to track unique experiences, education, skills, and projects
    const experienceSet = new Set();
    const educationSet = new Set();
    const skillsSet = new Set();
    const projectsSet = new Set();

    // Aggregate data for experience, education, skills, and projects
    rows.forEach((row) => {
      // Experience
      if (row.jobTitle && !experienceSet.has(row.experienceId)) {
        response.experience.push({
          jobTitle: row.jobTitle,
          company: row.company,
          startDate: row.startDate,
          endDate: row.endDate,
          responsibilities: row.responsibilities,
        });
        experienceSet.add(row.experienceId);
      }

      // Education
      if (row.degree && !educationSet.has(row.educationId)) {
        response.education.push({
          degree: row.degree,
          institution: row.institution,
          completionDate: row.completionDate,
        });
        educationSet.add(row.educationId);
      }

      // Projects
      if (row.projectTitle && !projectsSet.has(row.projectId)) {
        response.projects.push({
          title: row.projectTitle,
          link: row.projectLink,
          description: row.projectDescription,
        });
        projectsSet.add(row.projectId);
      }
    });

    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.put("/applicant-information/:userId", async (req, res, next) => {
  const userId = req.params.userId;

  const {
    fullName,
    phoneNumber,
    emailAddress,
    city,
    resume,
    linkedInProfileLink,
    githubProfileLink,
    experience,
    skills,
    education,
    projects,
  } = req.body;

  try {
    // Update personal information
    const updatePersonalInformationQuery = `
      UPDATE 
          personal_information
      SET 
          fullName = ?,
          phoneNumber = ?,
          emailAddress = ?,
          city = ?,
          resume = ?,
          linkedInProfileLink = ?,
          githubProfileLink = ?
      WHERE 
          userId = ?`;

    await req.db
      .promise()
      .query(updatePersonalInformationQuery, [
        fullName,
        phoneNumber,
        emailAddress,
        city,
        resume,
        linkedInProfileLink,
        githubProfileLink,
        userId,
      ]);

    // Handle work experience updates
    await req.db.promise().query(`DELETE FROM work_experience WHERE userId = ?`, [userId]);
    const updateExperiencePromises = experience.map((exp) => {
      const startDate = new Date(exp.startDate).toISOString().split("T")[0];
      const endDate = new Date(exp.endDate).toISOString().split("T")[0];
      return req.db.promise().query(
        `INSERT INTO work_experience (userId, jobTitle, company, startDate, endDate, responsibilities)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, exp.jobTitle, exp.company, startDate, endDate, exp.responsibilities],
      );
    });
    await Promise.all(updateExperiencePromises);

    // Update skills
    const updateSkillsQuery = `UPDATE skills SET skills = ? WHERE userId = ?`;
    await req.db.promise().query(updateSkillsQuery, [JSON.stringify(skills), userId]);

    // Handle education updates
    await req.db.promise().query(`DELETE FROM education WHERE userId = ?`, [userId]);
    const updateEducationPromises = education.map((edu) => {
      const completionDate = new Date(edu.completionDate).toISOString().split("T")[0];
      return req.db.promise().query(
        `INSERT INTO education (userId, degree, institution, completionDate)
        VALUES (?, ?, ?, ?)`,
        [userId, edu.degree, edu.institution, completionDate],
      );
    });
    await Promise.all(updateEducationPromises);

    // Handle portfolio updates
    await req.db.promise().query(`DELETE FROM portfolio WHERE userId = ?`, [userId]);
    const updateProjectsPromises = projects.map((project) => {
      return req.db.promise().query(
        `INSERT INTO portfolio (userId, projectTitle, projectLink, projectDescription)
        VALUES (?, ?, ?, ?)`,

        [userId, project.title, project.link, project.description],
      );
    });
    await Promise.all(updateProjectsPromises);

    // Send a successful response
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
