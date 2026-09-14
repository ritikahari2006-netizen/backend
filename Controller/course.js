//api for course data

const connectDB = require("../database/db.js")

//GET - Get all course data
const getcoursedata=async(req,res)=>{


    try
{
    const db=await connectDB();
    const course=db.collection ("course");
    const result=await course .find({}).toArray();

    res.send({
        status: 200,
        data: result
    });
}
catch(error)
{
    res.send({
        status:500,
        message:"Error retrieving course data",
        error:error.message
    });

}
};


//POST - Add Course data
const postcoursedata = async (req, res) => {
  try {

    console.log(req.body);

    const record = {
      ...req.body,
      courseid: parseInt(req.body.courseid)
    };

    const db = await connectDB();
    const course = db.collection("course");

    const result = await course.insertOne(record);

    if (result.acknowledged === true) {
      res.send({
        status: 200,
        message: "course data added successfully",
        data: result
      });
    } else {
      res.send({
        status: 400,
        message: "failed to add course data",
        data: result
      });
    }

  } catch (error) {
    res.send({
      status: 500,
      message: "Error inserting course data",
      error: error.message
    });
  }
};

const putcoursedata = async (req, res) => {
  try {

    const courseId = parseInt(req.params.id);

    const db = await connectDB();
    const course = db.collection("course");

    const result = await course.updateOne(
      { courseid: courseId },
      { $set: req.body }
    );

    console.log("Update result:", result);

    if (result.matchedCount > 0) {
      res.send({
        status: 200,
        message: "course data updated successfully",
        data: result,
        recordid: courseId
      });
    } else {
      res.send({
        status: 404,
        message: "course not found",
        data: result,
        recordid: courseId
      });
    }

  } catch (error) {
    res.send({
      status: 500,
      message: "error updating course data",
      error: error.message
    });
  }
};


 const deletecoursedata = async (req, res) => {
    try {

        const courseId = parseInt(req.query.id);

        const db = await connectDB();
        const course = db.collection("course");

        const result = await course.deleteOne({
            courseid: {
                $in: [courseId, String(courseId)]
            }
        });

        console.log("Course ID:", courseId);
        console.log("Delete result:", result);

        if (result.deletedCount > 0) {
            res.send({
                status: 200,
                message: "course data deleted successfully",
                recordid: courseId,
                data: result
            });
        } 
        else {
            res.send({
                status: 400,
                message: "failed to delete course data",
                recordid: courseId,
                data: result
            });
        }

    } catch (error) {
        res.send({
            status: 500,
            message: "error deleting course data",
            error: error.message
        });
    }
};
module.exports={getcoursedata,postcoursedata,putcoursedata,deletecoursedata}