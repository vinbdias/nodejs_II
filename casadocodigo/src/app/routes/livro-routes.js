const LivroController = require('../controllers/LivroController');
const livroController = new LivroController();

const Livro = require('../models/Livro');

const BaseController = require('../controllers/BaseController');

module.exports = app => {

    const livroRoutes = LivroController.routes();

    app.use(livroRoutes.autenticadas, (request, response, next) => {

        if(request.isAuthenticated())
            next();
        else
            response.redirect(BaseController.routes().login);
    });

    app.get(livroRoutes.lista, livroController.lista());

    app.route(livroRoutes.form)
        .get(livroController.form())
        .post(Livro.validacoes(), livroController.save())
        .put(livroController.edit());

    app.get(livroRoutes.formEdit, livroController.formEdit());

    app.delete(livroRoutes.delete, livroController.delete());

    app.get(livroRoutes.detail, livroController.detail());
};