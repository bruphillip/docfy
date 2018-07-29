const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  signin(req, res, _next) {
    res.render('auth/signin');
  },
  signup(req, res, _next) {
    res.render('auth/signup');
  },
  async register(req, res, _next) {
    try {
      const { email } = req.body;
      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'E-mail já cadastrado');
        return res.redirect('back');
      }
      const password = await bcrypt.hash(req.body.password, 5);
      await User.create({ ...req.body, password });
      req.flash('success', 'Usuário cadastrado com sucesso!');
      return res.redirect('/');
    } catch (err) {
      return _next(err);
    }
  },
  async authenticate(req, res, _next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        req.flash('error', 'Usuário e/ou senha Incorretos');
        return res.redirect('back');
      }
      if (!await bcrypt.compare(password, user.password)) {
        req.flash('error', 'Usuário e/ou senha Incorretos');
        return res.redirect('back');
      }

      req.session.user = user;
      return req.session.save(() => {
        res.redirect('app/dashboard');
      });
    } catch (err) {
      return _next(err);
    }
  },
  signout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
