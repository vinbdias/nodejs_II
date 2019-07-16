class BaseController {

    static routes() {

        return {
            home: '/'
        };
    }

    home() {

        return (request, response) =>
            response.marko(require('../views/base/home/home.marko'));
    }
}

module.exports = BaseController;