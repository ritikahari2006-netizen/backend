//api for course data

const listtt=require('../courselist.json')


const getcoursedata=(req,res)=>
{
    res.send({
        status: 200,
        data: listtt
    });
}

const postcoursedata=(req,res)=>{

    console.log(req.body);

res.send({
    status:200,
    message:"course data added successfully",
    data:req.body
});
}

const putcoursedata=('/updatedata/:id', (req, res) => {
    console.log("ID:", req.params.id);
    console.log("Data:", req.body);

    const courseId=req.params.id;
    const updateData=req.body;
    res.send({
        status:200,
        message:"course data updated successfully",
data:updateData,
recordid:courseId
    });
});
 const deletecoursedata=(req,res)=>
{
     const courseId=req.params.id;
    res.send({
        status:200,
        message:"course data deleted successfully ",
        recordid:courseId
    });
}

module.exports={getcoursedata,postcoursedata,putcoursedata,deletecoursedata}