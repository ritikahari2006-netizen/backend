//api for teacher data

const listt=require('../teacherlist.json')


const getteacherdata=(req,res)=>
{
    res.send({
        status: 200,
        data: listt
    });
}

const postteacherdata=(req,res)=>{

    console.log(req.body);

res.send({
    status:200,
    message:"student data added successfully",
    data:req.body
});
}

const putteacherdata=('/updatedata/:id', (req, res) => {
    console.log("ID:", req.params.id);
    console.log("Data:", req.body);

    const teacherId=req.params.id;
    const updateData=req.body;
    res.send({
        status:200,
        message:"teacher data updated successfully",
data:updateData,
recordid:teacherId
    });
});
 const deleteteacherdata=(req,res)=>
{
     const teacherId=req.params.id;
    res.send({
        status:200,
        message:"teacher data deleted successfully ",
        recordid:teacherId
    });
}

module.exports={getteacherdata,postteacherdata,putteacherdata,deleteteacherdata}