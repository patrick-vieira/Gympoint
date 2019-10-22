module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'patrick',
  password: 'docker',
  database: 'gympoint',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
