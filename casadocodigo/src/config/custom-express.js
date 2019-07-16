require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const templates = require('../app/views/templates');

app.use('/static', express.static('src/app/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride((request, response) => {

    if (request.body && typeof request.body === 'object' && '_method' in request.body) {
        // look in urlencoded POST bodies and delete it
        var method = request.body._method;
        delete request.body._method;
        return method;
    }
}));

const sessaoAutenticacao = require('./sessao-autenticacao');
sessaoAutenticacao(app);

const routes = require('../app/routes/routes');
routes(app);

app.use((request, response, next) => 
    response.status(404).marko(
            require(templates.base.error404.path)
    )
);

app.use((error, request, response, next) =>
    response.status(500).marko(
        require(templates.base.error500.path)
    )
);

module.exports = app;