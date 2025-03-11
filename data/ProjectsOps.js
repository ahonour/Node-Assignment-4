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

  async deleteProject(id) {
    let project = await Projects.findOneAndDelete({ id: Number(id) });
    console.log(`Tried to delete ${project}`);
    return project;
  }

  async createProject(project) {
    console.log('creating project');
    let newProject = new Projects(project);
    await newProject.save();
    return newProject;
  }

  async updateProject(id, project) {
    console.log(`updating project with id ${id}`);
    let updatedProject = await Projects.findOneAndUpdate(
      { id: Number(id) },
      project,
      { new: true }
    );
    return updatedProject;
  }
}

module.exports = ProjectsOps;
