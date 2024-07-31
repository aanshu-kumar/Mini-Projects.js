const express = require ("express");
const app = express();
const cors=require("cors");
const { createTodo } = require("./types");
const { todo } = require("./db");


app.use(express.json());
app.use(cors({
    origin:"hhtp://localhost:5173"
}));

app.post("/todo",async function(req,res){

    const createPayLoad = req.body;
    const parsePayLoad = createTodo.safeParse(createPayLoad);
    if(!parsePayLoad.success){
        res.status(411).json({
            msg:"you sent a wrong inputs"
        });
        return;
    }
    await todo.create({
        title:createPayLoad.title,
        description:createPayLoad.description,
        completed:false,
    })
    res.json({
        msg:"your Todo is created"
    })
})

app.get("/todos",async function(req,res){
const todos = await todo.find({});
res.json({
    todos
})
})
app.put("/completed",async function(req,res){

    const updatePayLoad =req.body;
    const parsePayLoad = update.safeParse(updatePayLoad);
    if(!parsePayLoad.success)
    {
        res.status(411).json({
            msg:"Todo donot exist"
        })
        return;
    }
    await todo.update({
        _id:req.body.id
    },{
        completed:true
    })
    res.json({
        msg:"todo is marked as completed"
    })
})

app.listen(3000)