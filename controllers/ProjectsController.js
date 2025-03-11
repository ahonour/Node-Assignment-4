const ProjectsOps = require('../data/ProjectsOps.js');

const _projectsOps = new ProjectsOps();
const multer = require('multer');
const upload = multer({ dest: 'public/images/' });

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

exports.Delete = async function (request, response) {
  const projectId = request.params.id;
  let delProject = await _projectsOps.deleteProject(projectId);
  if (delProject) {
    console.log(`successfully deleted ${delProject} (probably)`);
    let projects = await _projectsOps.getAllProjects();
    response.render('projects', {
      title: 'Projects',
      projects: projects,
    });
  } else {
    console.log('Error, project not found');
    response.render('error');
  }
};

exports.Create = async function (request, response) {
  response.render('project-modify', {
    title: 'Add a Project',
    message: null,
    project: {},
  });
};

exports.CreateProject = [
  upload.single('projectImg'),
  async function (request, response) {
    let tempProjectObj = new Projects({
      title: request.body.title,
      summary: request.body.summary,
      tech: request.body.tech,
      screenshot: request.file.filename,
      id: request.body.id,
    });

    let responseObj = await _projectsOps.createProject(tempProjectObj);

    if (responseObj.errorMsg == '') {
      let projects = await _projectsOps.getAllProjects();
      response.render('projects', {
        title: 'Projects',
        projects: projects,
      });
    } else {
      console.log('An error occurred. Item not created.');
      console.log(request.body);
      response.render('project-modify', {
        title: 'Add a Project',
        project: request.body,
        message: responseObj.errorMsg,
      });
    }
  },
];
