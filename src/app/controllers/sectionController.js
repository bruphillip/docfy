const { Section } = require('../models');

module.exports = {
  async create(req, res, next) {
    try {
      await Section.create({ ...req.body, ProjectId: req.params.id });
      return res.redirect(`/app/dashboard/project/${req.params.id}/description`);
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      await Section.destroy({ where: { id: req.params.sectionId } });
      return res.redirect(`/app/dashboard/project/${req.params.id}/description`);
    } catch (err) {
      return next(err);
    }
  },
};
