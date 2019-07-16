const templates = require('../views/templates');

class BaseController {

    static routes() {

        return {
            home: '/'
        };
    }

    home() {

        return (request, response) =>
            response.marko(require(templates.base.home.path));
    }
}

module.exports = BaseController;