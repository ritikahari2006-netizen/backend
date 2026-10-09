const connectDB = require("../database/db.js");


// =====================================================
// GET ALL TEACHERS
// =====================================================

const getteacherdata = async (req, res) => {

    try {

        const db = await connectDB();

        const teacher = db.collection("teacher");

        const result = await teacher.find({}).toArray();

        res.send({
            status: 200,
            data: result
        });

    } catch (error) {

        res.send({
            status: 500,
            message: "Error retrieving teacher data",
            error: error.message
        });

    }

};


// =====================================================
// POST TEACHER + IMAGE
// =====================================================

const postteacherdata = async (req, res) => {

    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const record = {

            teaid: parseInt(req.body.teaid),

            teaname: req.body.teaname,

            teaemail: req.body.teaemail,

            teaphone: req.body.teaphone,

            teasubject: req.body.teasubject,

            teaqualification: req.body.teaqualification,

            teaexperience: req.body.teaexperience,

            teacity: req.body.teacity,

            image: req.file
                ? req.file.filename
                : null
        };


        const db = await connectDB();

        const teacher = db.collection("teacher");

        const result = await teacher.insertOne(record);


        if (result.acknowledged) {

            res.send({

                status: 200,

                message: "Teacher data added successfully",

                data: record

            });

        } else {

            res.send({

                status: 400,

                message: "Failed to add teacher data"

            });

        }


    } catch (error) {

        console.error(error);

        res.send({

            status: 500,

            message: "Error inserting teacher data",

            error: error.message

        });

    }

};


// =====================================================
// PUT TEACHER DATA + OPTIONAL IMAGE
// =====================================================

const putteacherdata = async (req, res) => {

    try {

        console.log("UPDATE BODY:", req.body);
        console.log("UPDATE FILE:", req.file);

        const teacherId = parseInt(req.params.id);

        const db = await connectDB();

        const teacher = db.collection("teacher");


        const updateData = {

            teaid: teacherId,

            teaname: req.body.teaname,

            teaemail: req.body.teaemail,

            teaphone: req.body.teaphone,

            teasubject: req.body.teasubject,

            teaqualification: req.body.teaqualification,

            teaexperience: req.body.teaexperience,

            teacity: req.body.teacity

        };


        // If user selected a new image
        if (req.file) {

            updateData.image = req.file.filename;

        }


        const result = await teacher.updateOne(

            {
                teaid: {
                    $in: [
                        teacherId,
                        String(teacherId)
                    ]
                }
            },

            {
                $set: updateData
            }

        );


        if (result.matchedCount === 0) {

            return res.send({

                status: 404,

                message: "Teacher not found"

            });

        }


        res.send({

            status: 200,

            message: "Teacher updated successfully",

            data: result,

            image: updateData.image || null

        });


    } catch (error) {

        console.error(error);

        res.send({

            status: 500,

            message: "Error updating teacher",

            error: error.message

        });

    }

};


// =====================================================
// UPDATE ONLY IMAGE
// =====================================================

const updateTeacherImage = async (req, res) => {

    try {

        const teacherId = parseInt(req.params.id);


        if (!req.file) {

            return res.send({

                status: 400,

                message: "Please select an image"

            });

        }


        const db = await connectDB();

        const teacher = db.collection("teacher");


        const result = await teacher.updateOne(

            {
                teaid: {
                    $in: [
                        teacherId,
                        String(teacherId)
                    ]
                }
            },

            {
                $set: {

                    image: req.file.filename

                }
            }

        );


        if (result.matchedCount === 0) {

            return res.send({

                status: 404,

                message: "Teacher not found"

            });

        }


        res.send({

            status: 200,

            message: "Teacher image updated successfully",

            image: req.file.filename,

            imageUrl:
                `/uploads/${req.file.filename}`

        });


    } catch (error) {

        console.error(error);

        res.send({

            status: 500,

            message: "Error updating teacher image",

            error: error.message

        });

    }

};


// =====================================================
// DELETE TEACHER
// =====================================================

const deleteteacherdata = async (req, res) => {

    try {

        const teacherId =
            parseInt(req.query.id);


        const db = await connectDB();

        const teacher =
            db.collection("teacher");


        const result =
            await teacher.deleteOne({

                teaid: {
                    $in: [
                        teacherId,
                        String(teacherId)
                    ]
                }

            });


        if (result.deletedCount > 0) {

            res.send({

                status: 200,

                message:
                    "Teacher data deleted successfully",

                data: result

            });

        } else {

            res.send({

                status: 404,

                message:
                    "Teacher not found"

            });

        }


    } catch (error) {

        res.send({

            status: 500,

            message:
                "Error deleting teacher data",

            error: error.message

        });

    }

};


module.exports = {

    getteacherdata,

    postteacherdata,

    putteacherdata,

    updateTeacherImage,

    deleteteacherdata

};