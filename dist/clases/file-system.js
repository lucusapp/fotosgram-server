"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var FileSystem = /** @class */ (function () {
    function FileSystem() {
    }
    ;
    FileSystem.prototype.guardarImagenTemporal = function (file, userId) {
        var path = this.crearCarpetaUsuario(userId);
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
