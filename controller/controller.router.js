var tmplateController = require('./template.controller');
var dataController = require('./data.controller');

module.exports = function (app, express) {
    let route = express.Router();

    route.get('/app-listing', (req,res) => new tmplateController().getAppListingPage(req, res));

    route.get('/apps', (req,res) => new dataController().getAllApps(req, res));

    route.get('/appdetails', (req,res) => new tmplateController().appDetailsPage(req, res));

    route.get('/get-app-detail', (req,res) => new dataController().appDetails(req, res));

    route.get('/404', (req,res) => new tmplateController().notFound(req, res));

    return route;
}