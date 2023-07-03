import * as jwt from 'jsonwebtoken';


function verifyjwt(req,res,next){
    const token = req.headers['authorization']
    if(!token) return res.status(401).json('Unauthorize user')

   try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded
        next()

   }catch(e){
    res.status(400).json('Token not valid')
   }
}
   
       export default verifyjwt