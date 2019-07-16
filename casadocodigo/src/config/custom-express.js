require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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

const routes = require('../app/routes/routes');
routes(app);

app.use((request, response, next) => 
    response.status(404).marko(
            require('../app/views/base/errors/404.marko')
    )
);

app.use((error, request, response, next) =>
    response.status(500).marko(
        require('../app/views/base/errors/500.marko')
    )
);

module.exports = app;