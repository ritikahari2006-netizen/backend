//api for student data

const list=require('../studentlist.json')


const getstudentdata=(req,res)=>
{
    res.send({
        status: 200,
        data: list
    });
}

const poststudentdata=(req,res)=>{

    console.log(req.body);

res.send({
    status:200,
    message:"student data added successfully",
    data:req.body
});
}

const putstudentdata=('/updatedata/:id', (req, res) => {
    console.log("ID:", req.params.id);
    console.log("Data:", req.body);

    const studentId=req.params.id;
    const updateData=req.body;
    res.send({
        status:200,
        message:"student data updated successfully",
data:updateData,
recordid:studentId
    });
});
 const deletestudentdata=(req,res)=>
{
     const studentId=req.params.id;
    res.send({
        status:200,
        message:"student data deleted successfully ",
        recordid:studentId
    });
}

module.exports={getstudentdata,poststudentdata,putstudentdata,deletestudentdata}