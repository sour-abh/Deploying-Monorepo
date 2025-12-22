import  express, { type Request, type Response } from "express";
import {prisma} from 'db/client'
const app = express()
interface todo{
task:string,
userId:string
}
app.use(express.json())
app.get("/users",async function(req:Request, res:Response){
    try{
       const users= await prisma.user.findMany()
            res.status(200).json({
        userss: users
    })

    }catch(err){
        res.status(500).json({error:err})  
    }

})
app.post("/user",async function(req:Request,res:Response){

    const {username,password}=req.body
    if(!username || !password){
        res.status(400).json({message:"password and username are required"})
    }


    try{
        const user=await prisma.user.create({data:{username,password}})
        res.status(201).json({
            message:'user added successfully',
            user:user
        })
    }catch(err){
        res.status(500).json({ error:err})
    }

})

app.get("/todos",async function(req:Request, res:Response){
    try{
       const todos= await prisma.todo.findMany()
            res.status(200).json({
        todos: todos
    })

    }catch(err){
        res.status(500).json({error:err})  
    }

})
app.post("/todo",async function(req:Request,res:Response){

    const {userId,task}=req.body
    if(!userId || !task){
        res.status(400).json({message:"task and userId are required"})
    }


    try{
        const todo=await prisma.todo.create({data:{userId,task}})
        res.status(201).json({
            message:'todo added successfully',
            todo:todo
        })
    }catch(err){
        res.status(500).json({ error:err})
    }

})

app.listen(3005,()=>console.log('listening to port 3000'))
