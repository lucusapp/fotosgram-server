"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./clases/server"));
var usuarios_1 = __importDefault(require("./routes/usuarios"));
var mongoose_1 = __importDefault(require("mongoose"));
var server = new server_1.default();
//Rutas de mi aplicación
server.app.use('/user', usuarios_1.default);
//Conectar Db
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, function (err) {
    if (err)
        throw err;
    console.log('base de datos online');
});
//Levantar express
server.start(function () {
    console.log("Servidor corriendo en el puerto " + server.port);
});
