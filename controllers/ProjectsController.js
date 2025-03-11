const ProjectsOps = require('../data/ProjectsOps.js');

const _projectsOps = new ProjectsOps();

exports.Index = async function (request, response) {
  let projects = await _projectsOps.getAllProjects();
  if (projects) {
    if (request.query.format === 'json') {
      response.json(projects);
      return;
    }
    response.render('projects', {
      title: 'Projects',
      projects: projects,
    });
  } else {
    response.render('projects', {
      title: 'Projects',
      projects: [],
    });
  }
};

exports.Detail = async function (request, response) {
  const projectId = request.params.id;
  console.log(`loading single project by id ${projectId}`);
  let project = await _projectsOps.getProjectById(projectId);
  if (project) {
    if (request.query.format === 'json') {
      response.json(project);
      return;
    }
    response.render('project-details', {
      title: 'Project - ' + project.title,
      project: project,
    });
  } else {
    response.render('error', {
      title: '404',
      projects: [],
    });
  }
};

exports.Search = async function (request, response) {
  console.log('searching projects from controller');
  const searchTerm = request.query.searchTerm;
  console.log('querystring', searchTerm);
  let projects = await _projectsOps.getProjectBySearchTerm(searchTerm);
  if (projects) {
    if (request.query.format === 'json') {
      response.json(projects);
      return;
    }
    response.render('projects', {
      title: 'Projects',
      projects: projects,
    });
  } else {
    response.render('projects', {
      title: 'Projects',
      projects: [],
    });
  }
};
