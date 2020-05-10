import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';




export default class FileSystem{

    constructor(){ };

    guardarImagenTemporal(file:FileUpload,userId:string){

        return new Promise((resolve,reject)=>{
            //CREAR CARPETAS
            const path = this.crearCarpetaUsuario(userId)
            //NOMBRE ARCHIVO
            const nombreArchivo = this.generarNombreUnico(file.name);
            console.log(nombreArchivo);
            console.log(file.name);
            //MOVER DEL ARCHIVO DEL TEMP A NUESTRA CARPETA
            file.mv(`${path}/${nombreArchivo}`,(err:any)=>{
                if(err){
                    reject(err);
                }else{
                    resolve()
                }   
            })
        })

    
    }

    private generarNombreUnico(nombreOriginal:string){
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length -1];

        const idUnico =uniqid();

        return `${idUnico}.${extension}`;
        
    }
    private crearCarpetaUsuario(userId:string){
        const pathUser = path.resolve( __dirname, '../uploads', userId);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);
        
        const existe = fs.existsSync(pathUser);
        if(!existe){
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp)
        }
        return pathUserTemp
    }
}