import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import connection from "./config/conn.js";
import routes from './routes/routes.js';


const app =express()

//middleware

app.use(cors())
app.use(morgan('tiny'))
dotenv.config({path:'./.env'})
app.use(express.json());
app.use(helmet());
app.use('/api', routes)

//port

const port=process.env.PORT|| 3000
connection().then(()=>{
    app.listen(`${port}`,(err)=>{
        if(err) console.log('errr',err)
    
        console.log('connected to port',port)
    })
}).catch((err)=>{

})







