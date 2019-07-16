const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/LivroDao');
const db = require('../../config/database');

const templates = require('../views/templates');

class LivroController {

    static routes() {

        return {
            lista: '/livros',
            form: '/livros/form',
            formEdit: '/livros/form/:id',
            delete: '/livros/:id',
            detail: '/livros/detalhe/:id'          
        };
    }


    lista() {

        return (request, response) => {            

            const livroDao = new LivroDao(db);
            livroDao.lista()
                .then(livros => response.marko(
                    require(templates.livros.lista.path),
                    {
                        livros: livros
                    }
                ))
                .catch(error => console.log(error));
        };
    }

    form() {

        return (request, response) =>
            response.marko(require(templates.livros.form.path),
                {
                    livro: {
                        id: '',
                        titulo: '',
                        preco: '',
                        descricao: ''
                    }
                }
            );
    }

    formEdit() {

        return (request, response) => {

            const id = request.params.id;
            const livroDao = new LivroDao(db);

            livroDao.buscaPorId(id)
                .then(livro =>
                    response.marko(
                        require('../views/livros/form/form.marko'),
                        { livro }
                    )
                )
                .catch(error => console.log(error));
        };
    }

    save() {

        return (request, response) => {

            const livroDao = new LivroDao(db);

            const errors = validationResult(request);

            if (!errors.isEmpty())
                return response.marko(
                    require('../views/livros/form/form.marko'),
                    {
                        livro: {
                            id: '',
                            titulo: request.body.titulo,
                            preco: request.body.preco,
                            descricao: request.body.descricao
                        },
                        validationErrors: errors.array()
                    }
                );

            livroDao.adiciona(request.body)
                .then(response.redirect(LivroController.routes().lista))
                .catch(error => console.log(error));
        };
    }

    edit() {

        return (request, response) => {

            const livroDao = new LivroDao(db);

            livroDao.atualiza(request.body)
                .then(response.redirect(LivroController.routes().lista))
                .catch(error => console.log(error));
        };        
    }

    delete() {

        return (request, response) => {

            const id = request.params.id;

            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => response.status(200).end())
                .catch(error => console.log(error));
        };
    }

    detail() {

        return (request, response) => {

            const id = request.params.id;
            const livroDao = new LivroDao(db);

            livroDao.buscaPorId(id)
                .then(livro =>
                    response.marko(
                        require('../views/livros/detalhe/detalhe.marko'),
                        { livro }
                    )
                )
                .catch(error => console.log(error));
        };
    }    
}

module.exports = LivroController;