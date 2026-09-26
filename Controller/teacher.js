//api for teacher data

const connectDB = require("../database/db.js")



//GET - Get all teacher data
const getteacherdata=async(req,res)=>{


    try
{
    const db=await connectDB();
    const teacher=db.collection ("teacher");
    const result=await teacher .find({}).toArray();

    res.send({
        status: 200,
        data: result
    });
}
catch(error)
{
    res.send({
        status:500,
        message:"Error retrieving teacher data",
        error:error.message
    });

}
};

//POST - Add teacher data
const postteacherdata = async (req, res) => {
  try {

    const record = {
      ...req.body,
      teaid: parseInt(req.body.teaid)
    };

    const db = await connectDB();
    const teacher = db.collection("teacher");

    const result = await teacher.insertOne(record);

    if (result.acknowledged) {
      res.send({
        status: 200,
        message: "teacher data added successfully",
        data: result
      });
    } else {
      res.send({
        status: 400,
        message: "failed to add teacher data"
      });
    }

  } catch (error) {
    res.send({
      status: 500,
      message: "Error inserting teacher data",
      error: error.message
    });
  }
};
//update teacher data
const putteacherdata = async (req, res) => {
  try {
    const teacherId = parseInt(req.params.id);

    const db = await connectDB();
    const teacher = db.collection("teacher");

    const result = await teacher.updateOne(
      {
        teaid: {
          $in: [teacherId, String(teacherId)]
        }
      },
      {
        $set: req.body
      }
    );

    console.log("Update result:", result);

    if (result.matchedCount > 0) {
      res.send({
        status: 200,
        message: "teacher data updated successfully",
        data: result,
        recordid: teacherId
      });
    } else {
      res.send({
        status: 404,
        message: "teacher not found",
        data: result
      });
    }

  } catch (error) {
    res.send({
      status: 500,
      message: "error updating teacher data",
      error: error.message
    });
  }
};
//updateImage api
const updateTeacherImage = async (req, res) => {

    try {

        const teacherId = Number(req.params.id);

        if (!req.file) {
            return res.send({
                status: 400,
                message: "Please select an image"
            });
        }

        const db = await connectDB();
        const teacher = db.collection("teacher");

        const result = await teacher.updateOne(
            { id: teacherId },
            {
                $set: {
                    image: req.file.filename
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.send({
                status: 404,
                message: "teacher not found"
            });
        }

        res.send({
            status: 200,
            message: "Teacher image updated successfully",
            data: result
        });

    } catch (error) {

        res.send({
            status: 500,
            message: "Error updating teacher image",
            error: error.message
        });

    }
};
//delete teacher data api

const deleteteacherdata = async (req, res) => {
  try {
    const teacherId = parseInt(req.query.id);

    const db = await connectDB();
    const teacher = db.collection("teacher");

    const result = await teacher.deleteOne({
      teaid: {
        $in: [teacherId, String(teacherId)]
      }
    });

    console.log("Delete result:", result);

    if (result.deletedCount > 0) {
      res.send({
        status: 200,
        message: "teacher data deleted successfully",
        data: result,
        recordid: teacherId
      });
    } else {
      res.send({
        status: 404,
        message: "teacher not found",
        data: result
      });
    }

  } catch (error) {
    res.send({
      status: 500,
      message: "error deleting teacher data",
      error: error.message
    });
  }
};
module.exports={getteacherdata,postteacherdata,putteacherdata,deleteteacherdata}