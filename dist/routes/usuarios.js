"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRoutes = express_1.Router();
userRoutes.get('/prueba', function (req, res) {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien'
    });
});
exports.default = userRoutes;
