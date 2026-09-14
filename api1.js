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