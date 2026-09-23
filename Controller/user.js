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
        console.log("Received:", req.body);

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

        if (result.acknowledged === true) {
            res.send({
                status: 200,
                message: "user data inserted successfully",
                data: result
            });
        } else {
            res.send({
                status: 400,
                message: "failed to add user data",
                data: result
            });
        }

    } catch (error) {
        console.log("Error:", error);

        res.send({
            status: 500,
            message: "Error inserting user data",
            error: error.message
        });
    }
};
// api for matches the username and passsword with login 
// API for username and password login + OTP

const userlogin = async (req, res) => {

    try {

        const { username, password } = req.body || {};

        if (!username || !password) {

            return res.status(400).json({
                status: 400,
                message: "Username and password are required"
            });
        }

        const db = await connectDB();

        const user = db.collection("user");

        // Find registered user
        const result = await user.findOne({
            username: username,
            password: password
        });

        // User not found
        if (!result) {

            return res.status(401).json({
                status: 401,
                message: "Invalid username or password"
            });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        console.log("Generated OTP:", otp);

        // OTP will expire after 5 minutes
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        // Save OTP in the user's record
        await user.updateOne(
            { _id: result._id },
            {
                $set: {
                    loginOTP: otp,
                    otpExpiry: otpExpiry
                }
            }
        );

        // Send OTP to registered email
        await em.sendEmail(
            result.email,
            "Login OTP",
            `Your OTP for login is ${otp}. This OTP is valid for 5 minutes.`
        );

        res.status(200).json({
            status: 200,
            message: "OTP sent to your registered email"
        });

    } catch (error) {

        console.log("Login Error:", error);

        res.status(500).json({
            status: 500,
            message: "Error during login",
            error: error.message
        });
    }
};



const verifyotp = async (req, res) => {

    try {

        const { username, otp } = req.body || {};

        if (!username || !otp) {

            return res.status(400).json({
                status: 400,
                message: "Username and OTP are required"
            });
        }

        const db = await connectDB();

        const user = db.collection("user");

        // Find user with username and OTP
        const result = await user.findOne({
            username: username,
            loginOTP: otp
        });

        // OTP does not match
        if (!result) {

            return res.status(401).json({
                status: 401,
                message: "Invalid OTP"
            });
        }

        // Check OTP expiry
        if (!result.otpExpiry || new Date() > new Date(result.otpExpiry)) {

            return res.status(401).json({
                status: 401,
                message: "OTP has expired"
            });
        }

        // OTP is correct
        // Remove OTP after successful verification
        await user.updateOne(
            { _id: result._id },
            {
                $unset: {
                    loginOTP: "",
                    otpExpiry: ""
                }
            }
        );

        res.status(200).json({
            status: 200,
            message: "OTP verified successfully"
        });

    } catch (error) {

        console.log("OTP Error:", error);

        res.status(500).json({
            status: 500,
            message: "Error verifying OTP",
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

module.exports={getuserdata,postuserdata,putuserdata,deleteuserdata,userlogin,verifyotp
};