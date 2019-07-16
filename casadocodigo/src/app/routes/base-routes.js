const BaseController = require('../controllers/BaseController');
const baseController = new BaseController();

module.exports = app => {

    const baseRoutes = BaseController.routes();

    app.get(baseRoutes.home, baseController.home());

    app.route(baseRoutes.login)
        .get(baseController.loginForm())
        .post(baseController.login())
};