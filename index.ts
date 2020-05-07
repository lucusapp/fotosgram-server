import Server from "./clases/server";
import userRoutes from "./routes/usuarios";
import mongoose from 'mongoose';

const server = new Server();


//Rutas de mi aplicación
server.app.use('/user', userRoutes)


//Conectar Db
mongoose.connect('mongodb://localhost:27017/fotosgram',
                { useNewUrlParser: true, useCreateIndex:true},(err)=>{
     if(err) throw err;
     console.log('base de datos online');
                    
})
//Levantar express
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`)
})