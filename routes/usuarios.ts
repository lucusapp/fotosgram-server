import { Router,Request,Response } from "express";
import { Usuario } from "../models/usuario.models";
import bcrypt from 'bcrypt';



const userRoutes = Router();

//LOGIN
userRoutes.post('/login', (req:Request, res:Response)=>{

    const body= req.body;

    Usuario.findOne({email: body.email},(err,userDB)=>{
        if (err) throw err;

        if(!userDB){
            return res.json({
                ok:false,
                mensaje: "Usuario/contraseña no son correctos"
            });
        }
        if (userDB.compararPassword(body.password)){
            res.json({
                ok:true,
                token:'q4hrffnswsnrgfb sr'
            });
        }else{
            return res.json({
                ok:false,
                mensaje: "Usuario/contraseña no son correctos ****"
            });
        }
    })


    //CREAR UN USUARIO
    userRoutes.post('/create',(req:Request,res:Response)=>{
    
        const user= {
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.body.avatar
        }
    
    Usuario.create(user).then(userDb=>{

        res.json({
            ok:true,
            user:userDb
            })
        }).catch (err=>{
            res.json({
                ok:false,
                err
            })
        })  
    })
})

export default userRoutes;