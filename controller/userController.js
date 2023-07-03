import user from "../model/user.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'


import { ObjectId } from 'mongodb'

// creating user

export  const createUser=async (req,res)=>{
  
  const {name , email ,phoneNumber , password ,role , address,city}=req.body
  
  try{
    const existingUser= await user.findOne({email: email})
    const hash = bcrypt.hashSync(password, 10);
  

   //checking whether user is present or not

    if(existingUser){ 
   
      res.status(400).json({ message : 'user already exixts',data:[]})
    } 
    else{
        const result= await user.create({name: name , email: email, password: hash ,role: role,address: address|| '',city: city|| '' ,phoneNumber: phoneNumber|| ''}) 
        if (result) {
            return  res.status(200).json({ status: 200, data: result });
        } else {
            return res.status(500).json({ status: 500, data: result });
        }
    }
   
  } catch(error){

if (error.name === "ValidationError") {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    return res.status(400).send(errors);
  }
  res.status(500).send("Internal Server Error");
  }
}

export  const getUser=async (req,res)=>{

try{
  
const userList=Object.keys(req.query).length ===0 ?  await  user.find({}).select('-__v') : await user.findById(req.query).select('-__v')
if(userList){
  
  res.status(200).json({ message : 'user fetched sucessfully',data:userList})

}else{

  res.status(500).json({ message : 'user  cant be fetched ',data:[]})
}
} catch(error){

if (error.name === "ValidationError") {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    return res.status(400).send(errors);
  }
  res.status(500).send("Internal Server Error");
  }
}
//update user
export  const updateUser=async (req,res)=>{
  const {_id}=req.query;
  const id=_id
  const { password }=req.body
  console.log('id',id)
  console.log('req.body',req.body)

try{
  const existingUser= await user.findById(req.query)  

//checking whether user is present or not
  if(!existingUser){ 
 
      res.status(400).json({ message : 'user is not present',data:[]})
  } else{
   
  
  
  const hashedPassword = bcrypt.hashSync(password, 10);

  if(hashedPassword){
   req.body.password= hashedPassword
  }


      const result= await user.updateOne({_id:id},{$set:req.body },{ upsert: true, returnDocument: 'after'}) 
    
      if (result) {
          return  res.status(200).json({ status: 200, data: result });
      } else {
          return res.status(500).json({ status: 500, data: result });
      }
  }
 
} catch(error){

if (error.name === "ValidationError") {
  let errors = {};

  Object.keys(error.errors).forEach((key) => {
    errors[key] = error.errors[key].message;
  });

  return res.status(400).send(errors);
}
console.log('eeror',error)
res.status(500).send("Internal Server Error");
}
}

// delete user
export  const deleteUser=async (req,res)=>{
 
  
try{

const userList= await user.findByIdAndRemove(req.query)

if(userList){
res.status(201).json({ message : 'user deleted sucessfully'})
}else{
res.status(500).json({ message : 'user  cant be deleted ',data:[]})
}
} catch(error){

if (error.name === "ValidationError") {
  let errors = {};

  Object.keys(error.errors).forEach((key) => {
    errors[key] = error.errors[key].message;
  });

  return res.status(400).send(errors);
}
res.status(500).send("Internal Server Error");
}
}
// login user

export  const loginUser =async (req,res)=>{
  
  const { password ,email}=req.body

try{
  const existingUser= await user.findOne({email: req.body.email })
  
//checking whether user is present or not

  if(!existingUser){ 
 
      res.status(400).json({ message : 'user is not present',data:[]})
  } else{
  
    const comparePassword =  bcrypt.compareSync(
      password,
      existingUser.password
  );
  // const { sign } = jwt 
if(comparePassword){
  const accessToken = jwt.sign(
    { id: existingUser._id,  email },
    process.env.SECRET_KEY,
    { expiresIn: '10m' }
  );
  const refreshToken = jwt.sign(
    { id: existingUser._id,  email },
    process.env.SECRET_KEY,
    { expiresIn: 86400 }
  );

  delete existingUser.password
  const userDetails={data: existingUser, accessToken: accessToken}
  console.log('user',userDetails)
  res.status(200).json({message: 'user loged in successfully' , data: userDetails})
}else{
  res.status(500).json({message: 'user email or password does not match'})
}
}
 
} catch(error){
console.error('login error',error)
res.status(500).send("Internal Server Error");
}
}