const express=require ('express');//import express
const app=express();
const list=require('./studentlist.json')
const port=3000;
app.use(express.json());
app.get('/getdata', (req, res) => {
    res.send({
        status: 200,
        data: list
    });
});
 app.post('/postdata',(req,res)=>
 {
res.send({
    status:200,
    message:"student data added successfully",
    data:req.body
});
//handle POST request for adding new student data
 });
 app.put ('/updatedata/:id',(req,res)=>
 {
    const studentId=req.params.id;
    const updateData=req.body;
    res.send({
        status:200,
        message:"student data updated successfully",
data:updateData,
recordid:studentId
    });
    //handle PUT request for updating student data 
 });
app.delete('/deletedata',(req,res)=>
{
    const studentId=req.query.id;
    res.send({
        status:200,
        message:"student data deleted successfully ",
        recordid:studentId
    });
})
app.listen(port,()=>
{
    console.log('server is running on https://localhost:${port}');
});


const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const cors = require('cors');

const app = express();

app.set("view engine", "ejs");

const indexRouter = require('./Routes/index.js');

const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use('/', indexRouter);


// ================= SWAGGER CONFIGURATION =================

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "My Node.js API",
            version: "1.0.0",
            description: "API documentation for my Node.js project"
        },

        servers: [
            {
                url: "http://localhost:3001"
            }
        ]
    },

    apis: ["./Routes/*.js"]
};


// Generate Swagger documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);


// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ================= SERVER =================

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
    console.log(`Swagger is running on http://localhost:${port}/api-docs`);
});