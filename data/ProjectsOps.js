const Projects = require('../models/Projects.js');

class ProjectsOps {
  // empty constructor
  ProjectsOps() {}
  //   constructor() {}

  // DB methods
  async getAllProjects() {
    console.log('getting all projects');
    let projects = await Projects.find({});
    console.log(`these are the projects: ${projects}`);
    return projects;
  }
  async getProjectById(id) {
    console.log(`getting project by id ${id}`);
    let project = await Projects.findOne({ id: Number(id) });
    console.log(project);
    return project;
  }
  async getProjectBySearchTerm(searchTerm) {
    console.log(`getting project by search term ${searchTerm}`);

    let searchRegex = new RegExp(searchTerm, 'i');

    // Search in title, summary, and tech
    let projects = await Projects.find({
      $or: [
        { title: { $regex: searchRegex } },
        { summary: { $regex: searchRegex } },
        { tech: { $elemMatch: { $regex: searchRegex } } },
      ],
    });

    return projects;
  }
}

module.exports = ProjectsOps;
