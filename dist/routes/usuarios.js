"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_models_1 = require("../models/usuario.models");
var bcrypt_1 = __importDefault(require("bcrypt"));
var userRoutes = express_1.Router();
//LOGIN
userRoutes.post('/login', function (req, res) {
    var body = req.body;
    usuario_models_1.Usuario.findOne({ email: body.email }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: "Usuario/contraseña no son correctos"
            });
        }
        if (userDB.compararPassword(body.password)) {
            res.json({
                ok: true,
                token: 'q4hrffnswsnrgfb sr'
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: "Usuario/contraseña no son correctos ****"
            });
        }
    });
    //CREAR UN USUARIO
    userRoutes.post('/create', function (req, res) {
        var user = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt_1.default.hashSync(req.body.password, 10),
            avatar: req.body.avatar
        };
        usuario_models_1.Usuario.create(user).then(function (userDb) {
            res.json({
                ok: true,
                user: userDb
            });
        }).catch(function (err) {
            res.json({
                ok: false,
                err: err
            });
        });
    });
});
exports.default = userRoutes;
