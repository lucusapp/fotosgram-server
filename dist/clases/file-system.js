"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var uniqid_1 = __importDefault(require("uniqid"));
var FileSystem = /** @class */ (function () {
    function FileSystem() {
    }
    ;
    FileSystem.prototype.guardarImagenTemporal = function (file, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //CREAR CARPETAS
            var path = _this.crearCarpetaUsuario(userId);
            //NOMBRE ARCHIVO
            var nombreArchivo = _this.generarNombreUnico(file.name);
            console.log(nombreArchivo);
            console.log(file.name);
            //MOVER DEL ARCHIVO DEL TEMP A NUESTRA CARPETA
            file.mv(path + "/" + nombreArchivo, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    FileSystem.prototype.generarNombreUnico = function (nombreOriginal) {
        var nombreArr = nombreOriginal.split('.');
        var extension = nombreArr[nombreArr.length - 1];
        var idUnico = uniqid_1.default();
        return idUnico + "." + extension;
    };
    FileSystem.prototype.crearCarpetaUsuario = function (userId) {
        var pathUser = path_1.default.resolve(__dirname, '../uploads', userId);
        var pathUserTemp = pathUser + '/temp';
        console.log(pathUser);
        var existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    };
    FileSystem.prototype.imagenesDeTempHaciaPost = function (userId) {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        var pathPosts = path_1.default.resolve(__dirname, '../uploads', userId, 'posts');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPosts)) {
            fs_1.default.mkdirSync(pathPosts);
        }
        //mover del directorio Temp al directorio Post
        var imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(function (imagen) {
            fs_1.default.renameSync(pathTemp + "/" + imagen, pathPosts + "/" + imagen);
        });
        return imagenesTemp;
    };
    FileSystem.prototype.obtenerImagenesEnTemp = function (userId) {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    };
    FileSystem.prototype.getFotoUrl = function (userId, img) {
        //path Posts
        var pathFoto = path_1.default.resolve(__dirname, '../uploads', userId, 'posts', img);
        //si la imagen existe
        var existe = fs_1.default.existsSync(pathFoto);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400X250.jpg');
        }
        return pathFoto;
    };
    return FileSystem;
}());
exports.default = FileSystem;
