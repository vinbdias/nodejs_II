const templates = require('../views/templates');

const LivroController = require('./LivroController');

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

        return (request, response, next) => {

            const passport = request.passport;

            passport.authenticate('local', (error, usuario, info) => {

                if(info)
                    return response.marko(templates.base.login.path);

                if(error)
                    return next(error);

                request.login(usuario, error => {

                    if(error)
                        return next(error);

                    return response.redirect(LivroController.routes().lista);
                });
            })(request, response, next);
        };
    }
}

module.exports = BaseController;