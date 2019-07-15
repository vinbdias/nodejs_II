const LivroDao = require('../infra/LivroDao');
const db = require('../../config/database');

module.exports = (app) => {

    app.get('/', (request, response) =>
        response.marko(require('../views/base/home/home.marko')));
    
    app.get('/livros', (request, response) => {

        const livroDao = new LivroDao(db);
        livroDao.lista()
                .then(livros => response.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros: livros
                    }
                ))
                .catch(error => console.log(error));
    });

    app.get('/livros/form', (request, response) => 
        response.marko(require('../views/livros/form/form.marko'),
        {
            livro: {
                id: '',
                titulo: '',
                preco: '',
                descricao: ''
            }
        }
    ));

    app.get('/livros/form/:id', (request, response) => {

        const id = request.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
                .then(livro => 
                    response.marko(
                        require('../views/livros/form/form.marko'), 
                        { livro: livro }
                    )
                )
                .catch(error => console.log(error));
    });

    app.post('/livros', (request, response) => {
        
        const livroDao = new LivroDao(db);
        
        livroDao.adiciona(request.body)
                .then(response.redirect('/livros'))
                .catch(error => console.log(error));
    });

    app.put('/livros', (request, response) => {
        
        const livroDao = new LivroDao(db);
        
        livroDao.atualiza(request.body)
                .then(response.redirect('/livros'))
                .catch(error => console.log(error));
    });

    app.delete('/livros/:id', (request, response) => {

        const id = request.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
                .then(() => response.status(200).end())
                .catch(error => console.log(error));
    });
};