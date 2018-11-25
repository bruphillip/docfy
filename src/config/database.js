module.exports = {
  username: 'mysql',
  password: 'mysql',
  database: 'docfy',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  // dialect: 'postgres'
  dialect: 'mysql'
};
