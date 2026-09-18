//api for user data

const connectDB = require("../database/db.js")
const em=require("./email.js");
//GET - Get all student data
const getuserdata=async(req,res)=>{


    try
{
    const db=await connectDB();
    const user=db.collection ("user");
    const result=await user .find({}).toArray();

    res.send({
        status: 200,
        data: result
    });
}
catch(error)
{
    res.send({
        status:500,
        message:"Error retrieving user data",
        error:error.message
    });

}
};
//POST - Add User data
const postuserdata = async (req, res) => {
  try {

    console.log("BODY:", req.body);

    if (!req.body) {
      return res.status(400).send({
        status: 400,
        message: "Request body is missing"
      });
    }

    console.log("USERNAME:", req.body.username);
    console.log("EMAIL:", req.body.email);
    console.log("PASSWORD:", req.body.password);

    const record = {
      ...req.body
    };

    const db = await connectDB();
    const user = db.collection("user");

    const result = await user.insertOne(record);

    await em.sendEmail(
      req.body.email,
      "User Registration Successfully",
      "User Registered Successfully"
    );

    res.send({
      status: 200,
      message: "user data inserted successfully",
      data: result
    });

  } catch (error) {

    console.log("ERROR:", error);

    res.status(500).send({
      status: 500,
      message: "Error inserting user data",
      error: error.message
    });
  }
};
//PUT- Update user data
const putuserdata = async (req, res) => {
  try {

    const userId = Number(req.params.id);

    const db = await connectDB();
    const user = db.collection("user");

    const updateData = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };

    const result = await user.updateOne(
      { id: userId },
      { $set: updateData }
    );

    if (result.matchedCount > 0) {

      res.send({
        status: 200,
        message: "user data updated successfully",
        data: result
      });

    } else {

      res.send({
        status: 404,
        message: "user not found"
      });

    }

  } catch (error) {

    res.send({
      status: 500,
      message: "error updating user data",
      error: error.message
    });

  }
};
//Delete- Delete user data
//for query we use (?)
 const deleteuserdata = async (req, res) => {
  try {

    const userId = Number(req.query.id);

    const db = await connectDB();
    const user = db.collection("user");

    const result = await user.deleteOne({
      id: userId
    });

    if (result.deletedCount > 0) {

      res.send({
        status: 200,
        message: "user data deleted successfully",
        data: result
      });

    } else {

      res.send({
        status: 404,
        message: "user not found"
      });

    }

  } catch (error) {

    res.send({
      status: 500,
      message: "error deleting user data",
      error: error.message
    });

  }
};

module.exports={getuserdata,postuserdata,putuserdata,deleteuserdata}