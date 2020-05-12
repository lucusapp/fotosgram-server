import Server from "./clases/server";
import userRoutes from "./routes/usuarios";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import postRoutes from "./routes/post";

const server = new Server();

// BodyParser
server.app.use(bodyParser.urlencoded({extended:true}))
server.app.use(bodyParser.json())

//FileUpload
server.app.use(fileUpload())

//Configurar CORS
server.app.use(cors({origin:true, credentials:true}));

//Rutas de mi aplicación
server.app.use('/user', userRoutes)
server.app.use('/posts', postRoutes)


//Conectar Db
mongoose.connect('mongodb://localhost:27017/fotosgram',
                { useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true},(err)=>{
     if(err) throw err;
     console.log('base de datos online');
                    
})
//Levantar express
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`)
})