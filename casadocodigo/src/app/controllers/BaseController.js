const templates = require('../views/templates');

class BaseController {

    static routes() {

        return {
            home: '/',
            login: '/login'
        };
    }

    home() {

        return (request, response) =>
            response.marko(require(templates.base.home.path));
    }

    loginForm() {

        return (request, response) => 
            response.marko(require(templates.base.login.path));        
    }

    login() {

        return (request, response) => {
            
        };
    }
}

module.exports = BaseController;