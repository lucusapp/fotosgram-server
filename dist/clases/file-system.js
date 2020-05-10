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
        //CREAR CARPETAS
        var path = this.crearCarpetaUsuario(userId);
        //NOMBRE ARCHIVO
        var nombreArchivo = this.generarNombreUnico(file.name);
        console.log(nombreArchivo);
        console.log(file.name);
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
    return FileSystem;
}());
exports.default = FileSystem;
