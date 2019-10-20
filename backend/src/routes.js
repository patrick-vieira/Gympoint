const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => {
  console.log(req);
  return res.json({ message: 'ahoy'});
})

module.exports = routes;