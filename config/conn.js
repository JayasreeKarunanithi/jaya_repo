import mongoose from "mongoose";


function connection(){
    const db=process.env.DBCONNECTIONSTRING
  const conn=mongoose.connect(`${db}`).then((res)=>{
    console.log('connected to DB')
    }).catch((err)=>{
        console.log('cant connect to DB and port')
    })
    return conn
}
export default connection