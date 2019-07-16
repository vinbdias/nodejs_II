const LivroController = require('../controllers/LivroController');
const livroController = new LivroController();

const Livro = require('../models/Livro');

module.exports = app => {

    const livroRoutes = LivroController.routes();

    app.get(livroRoutes.lista, livroController.lista());

    app.route(livroRoutes.form)
        .get(livroController.form())
        .post(Livro.validacoes(), livroController.save())
        .put(livroController.edit());

    app.get(livroRoutes.formEdit, livroController.formEdit());

    app.delete(livroRoutes.delete, livroController.delete());

    app.get(livroRoutes.detail, livroController.detail());
};