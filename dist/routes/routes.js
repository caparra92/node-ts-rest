"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Routes = /** @class */ (function () {
    function Routes() {
        this.router = express_1.Router();
        this.routes();
    }
    Routes.prototype.routes = function () {
        this.router.get('/', function (req, res) { return res.send('API: /api/post'); });
    };
    return Routes;
}());
var routes = new Routes();
routes.routes();
exports.default = routes.router;
