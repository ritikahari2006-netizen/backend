//api for student data
//student.js is responsible for getting student data from MongoDB.
const connectDB = require("../database/db.js")
const {sendEmail}=require("./email.js");

//GET - Get all student data
const getstudentdata=async(req,res)=>{


    try
{
    const db=await connectDB();
    const student=db.collection ("student");
    const result=await student .find({}).toArray();

    res.send({
        status: 200,
        data: result
    });
}
catch(error)
{
    res.send({
        status:500,
        message:"Error retrieving student data",
        error:error.message
    });

}
};
//POST - Add Student data
const poststudentdata = async (req, res) => {

    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const db = await connectDB();
        const student = db.collection("student");

        const data = {
            id: Number(req.body.id),
            name: req.body.name,
            age: Number(req.body.age),
            marks: Number(req.body.marks),
            city: req.body.city,
            email: req.body.email,
            course: req.body.course,
            image: req.file ? req.file.filename : null
        };

        console.log("DATA TO INSERT:", data);

        const result = await student.insertOne(data);

        if (result.acknowledged) {

            return res.send({
                status: 200,
                message: "Student data added successfully",
                data: result
            });

        }

        return res.send({
            status: 400,
            message: "Failed to add student data"
        });

    } catch (error) {

        console.error("Insert error:", error);

        return res.send({
            status: 500,
            message: "Error inserting student data",
            error: error.message
        });
    }
};
//PUT- Update student data
const putstudentdata = async (req, res) => { 
  try { 
    const studentId = Number(req.params.id); 
 
    const db = await connectDB(); 
    const student = db.collection("student"); 
 
    // Find student whether id is stored as number or string 
    const existingStudent = await student.findOne({ 
      $or: [ 
        { id: studentId }, 
        { id: String(studentId) } 
      ] 
    }); 
 
    console.log("Student ID received:", studentId); 
    console.log("Student found:", existingStudent); 
 
    if (!existingStudent) { 
      return res.send({ 
        status: 404, 
        message: "student not found", 
        recordid: studentId 
      }); 
    } 
 
    // Update only editable fields 
    const updateData = { 
      name: req.body.name, 
      email: req.body.email, 
      age: Number(req.body.age), 
      city: req.body.city, 
      course: req.body.course, 
      marks: Number(req.body.marks) 
    }; 
 
    const result = await student.updateOne( 
      { _id: existingStudent._id }, 
      { $set: updateData } 
    ); 
 
    console.log("Update result:", result); 
 
    if (result.matchedCount > 0) { 
      res.send({ 
        status: 200, 
        message: "student data updated successfully", 
        data: result, 
        recordid: studentId 
      }); 
    } else { 
      res.send({ 
        status: 400, 
        message: "failed to update student data", 
        data: result, 
        recordid: studentId 
      }); 
    } 
 
  } catch (error) { 
    console.error("Update error:", error); 
 
    res.send({ 
      status: 500, 
      message: "error updating student data", 
      error: error.message 
    }); 
  } 
};
//for updateimage we use multer middleware to upload image and then update the image field in student collection


const updateStudentImage = async (req, res) => {

    try {

        const studentId = Number(req.params.id);

        if (!req.file) {
            return res.send({
                status: 400,
                message: "Please select an image"
            });
        }

        const db = await connectDB();
        const student = db.collection("student");

        const result = await student.updateOne(
            { id: studentId },
            {
                $set: {
                    image: req.file.filename
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.send({
                status: 404,
                message: "Student not found"
            });
        }

        res.send({
            status: 200,
            message: "Student image updated successfully",
            data: result
        });

    } catch (error) {

        res.send({
            status: 500,
            message: "Error updating student image",
            error: error.message
        });

    }
};


//Delete- Delete student data
//for query we use (?)
 const deletestudentdata = async (req, res) => {
  try {
    const studentId = Number(req.query.id);

    const db = await connectDB();
    const student = db.collection("student");

    // Find student whether id is number or string
    const existingStudent = await student.findOne({
      $or: [
        { id: studentId },
        { id: String(studentId) }
      ]
    });

    console.log("Student ID received for delete:", studentId);
    console.log("Student found:", existingStudent);

    if (!existingStudent) {
      return res.send({
        status: 404,
        message: "student not found",
        recordid: studentId
      });
    }

    // Delete using MongoDB _id
    const result = await student.deleteOne({
      _id: existingStudent._id
    });

    console.log("Delete result:", result);

    if (result.deletedCount > 0) {
      res.send({
        status: 200,
        message: "student data deleted successfully",
        data: result,
        recordid: studentId
      });
    } else {
      res.send({
        status: 400,
        message: "failed to delete student data",
        data: result,
        recordid: studentId
      });
    }

  } catch (error) {
    console.error("Delete error:", error);

    res.send({
      status: 500,
      message: "error deleting student data",
      error: error.message
    });
  }
};

module.exports={getstudentdata,poststudentdata,putstudentdata,deletestudentdata,updateStudentImage}