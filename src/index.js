const express = require('express');
// const path = require('path');
// const flash = require('connect-flash');
// const session = require('express-session');
// const methodOverride = require('method-override');
// const bodyParser = require('body-parser');
// const sessionConfig = require('./config/session');
// const routes = require('./app/routes');

const app = express();

const PORT = 3000;
const HOST = '0.0.0.0';

// app.use(express.static(path.resolve('src', 'app', 'public')));
// require('./nunjucks')(app);

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(session(sessionConfig));
// app.use(flash());
// app.use(methodOverride('_method'));

// app.use('/', routes);
app.use('/', (req, res) => {
  res.send('Hellou!');
});

app.listen(PORT, HOST);
