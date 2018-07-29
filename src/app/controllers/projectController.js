const { Project, Section } = require('../models');

module.exports = {
  async create(req, res, next) {
    try {
      await Project.create({ ...req.body, UserId: req.session.user.id });
      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
  async show(req, res, next) {
    try {
      const { id, sectionId } = req.params;
      let section = {};
      const projects = await Project.findAll({
        include: [Section],
        where: {
          UserId: req.session.user.id,
          id,
        },
      });
      if (req.params.sectionId) {
        section = await Section.findOne({
          where: {
            id: sectionId,
            ProjectId: req.params.id,
          },
        });
      }

      return res.render('dashboard/project.njk',
        {
          projects: projects[0],
          user: req.session.user,
          sections: projects[0].Sections,
          section,
        });
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      await Project.destroy({ where: { id: req.params.id } });
      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
