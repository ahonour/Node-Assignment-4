const express = require('express');
const projectRouter = express.Router();
const path = require('path');
const projects = require('../public/data/projects.data.js');
const ProjectsController = require('../controllers/ProjectsController.js');

// const viewData = [];

projectRouter.get('/search', ProjectsController.Search);
projectRouter.get('/:id', ProjectsController.Detail);
projectRouter.get('/', ProjectsController.Index);

module.exports = projectRouter;
