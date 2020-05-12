"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./clases/server"));
var usuarios_1 = __importDefault(require("./routes/usuarios"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var post_1 = __importDefault(require("./routes/post"));
var server = new server_1.default();
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//FileUpload
server.app.use(express_fileupload_1.default());
//Configurar CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas de mi aplicación
server.app.use('/user', usuarios_1.default);
server.app.use('/posts', post_1.default);
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
