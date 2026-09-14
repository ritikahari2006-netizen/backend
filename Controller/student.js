//api for student data
//student.js is responsible for getting student data from MongoDB.
const connectDB = require("../database/db.js")

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

    console.log("Received:", req.body);

    const record = {
      ...req.body,
      id: Number(req.body.id),
      age: Number(req.body.age),
      marks: Number(req.body.marks)
    };

    const db = await connectDB();
    const student = db.collection("student");

    const result = await student.insertOne(record);

    if (result.acknowledged === true) {

      res.send({
        status: 200,
        message: "student data added successfully",
        data: result
      });

    } else {

      res.send({
        status: 400,
        message: "failed to add student data",
        data: result
      });

    }

  } catch (error) {

    res.send({
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

module.exports={getstudentdata,poststudentdata,putstudentdata,deletestudentdata}