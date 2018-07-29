const express = require('express');
const {
  authController,
  dashboardController,
  projectController,
  sectionController,
} = require('./controllers');
const { auth, guess } = require('./middleware');

const routes = express.Router();

routes.use('/', (req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/**
 * Auth
 */
routes.get('/', guess, authController.signin);
routes.get('/signup', guess, authController.signup);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);
routes.post('/signout', authController.signout);

/**
 * Dashboard
 */
routes.use('/app', auth);
routes.get('/app/dashboard', dashboardController.show);

/**
 * Projects
 */
routes.post('/app/projects', projectController.create);
routes.get('/app/dashboard/project/:id/description/:sectionId*?', projectController.show);
routes.delete('/app/dashboard/project/:id/description', projectController.destroy);

/**
 * Section
 */
routes.post('/app/dashboard/project/:id/description/create', sectionController.create);
routes.delete('/app/dashboard/project/:id/description/destroy/:sectionId', sectionController.destroy);

/**
 * Errors
 */
routes.use((err, req, res, _next) => {
  res.status(err.status || 500);
  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
