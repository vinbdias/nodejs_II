const baseRoutes = require('./base-routes');
const livroRoutes = require('./livro-routes');

module.exports = (app) => {
    baseRoutes(app);
    livroRoutes(app);
};