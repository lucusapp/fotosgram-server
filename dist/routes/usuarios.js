"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_models_1 = require("../models/usuario.models");
var bcrypt_1 = __importDefault(require("bcrypt"));
var token_1 = __importDefault(require("../clases/token"));
var autenticacion_1 = require("../middlewares/autenticacion");
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
            var tokenUser = token_1.default.getJwtToken({
                _id: userDB.id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
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
        usuario_models_1.Usuario.create(user).then(function (userDB) {
            var tokenUser = token_1.default.getJwtToken({
                _id: userDB.id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }).catch(function (err) {
            res.json({
                ok: false,
                err: err
            });
        });
    });
});
//Actualizar usuario
userRoutes.post('/update', autenticacion_1.verificaToken, function (req, res) {
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        avatar: req.body.avatar
    };
    usuario_models_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese Id'
            });
        }
        var tokenUser = token_1.default.getJwtToken({
            _id: userDB.id,
            nombre: userDB.nombre || req.usuario.nombre,
            email: userDB.email || req.usuario.nombre,
            avatar: userDB.avatar || req.usuario.nombre
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    });
});
exports.default = userRoutes;
