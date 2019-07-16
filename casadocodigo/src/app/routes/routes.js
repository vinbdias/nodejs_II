const { check } = require('express-validator/check');

const LivroController = require('../controllers/LivroController');
const livroController = new LivroController();

const BaseController = require('../controllers/BaseController');
const baseController = new BaseController();

module.exports = (app) => {

    const baseRoutes = BaseController.routes();
    const livroRoutes = LivroController.routes();

    app.get(baseRoutes.home, baseController.home());
    
    app.get(livroRoutes.lista, livroController.lista());

    app.get(livroRoutes.form, livroController.form());

    app.get(livroRoutes.formEdit, livroController.formEdit());

    app.post(livroRoutes.lista, 
        [
            check('titulo')
                .isLength({ min: 5 })
                .withMessage('O título precisa ter no mínimo 5 caracteres.'),
            check('preco')
                .isCurrency()
                .withMessage('O preço precisa ter um valor monetário válido.')
        ], 
        livroController.save()
    );

    app.put(livroRoutes.lista, livroController.edit());

    app.delete(livroRoutes.delete, livroController.delete());
};