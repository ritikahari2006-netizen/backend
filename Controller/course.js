// api for course data

const connectDB = require("../database/db.js");


// =====================================================
// GET - Get all course data
// =====================================================

const getcoursedata = async (req, res) => {

    try {

        const db = await connectDB();

        const course = db.collection("course");

        const result = await course.find({}).toArray();

        res.send({

            status: 200,

            data: result

        });

    }
    catch (error) {

        res.send({

            status: 500,

            message: "Error retrieving course data",

            error: error.message

        });

    }

};



// =====================================================
// POST - Add Course + Image
// =====================================================

const postcoursedata = async (req, res) => {

    try {

        console.log("Body:", req.body);

        console.log("File:", req.file);


        const record = {

            courseid: parseInt(req.body.courseid),

            coursename: req.body.coursename,

            trainer: req.body.trainer,

            duration: req.body.duration,

            fees: req.body.fees,

            mode: req.body.mode,

            // image filename
            image: req.file
                ? req.file.filename
                : null

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

        }
        else {

            res.send({

                status: 400,

                message: "failed to add course data",

                data: result

            });

        }

    }
    catch (error) {

        console.log(error);

        res.send({

            status: 500,

            message: "Error inserting course data",

            error: error.message

        });

    }

};



// =====================================================
// PUT - Update Course Details
// =====================================================

const putcoursedata = async (req, res) => {

    try {

        const courseId =
            parseInt(req.params.id);


        const db = await connectDB();

        const course =
            db.collection("course");


        const record = {

            courseid: courseId,

            coursename: req.body.coursename,

            trainer: req.body.trainer,

            duration: req.body.duration,

            fees: req.body.fees,

            mode: req.body.mode

        };


        const result =
            await course.updateOne(

                { courseid: courseId },

                {
                    $set: record
                }

            );


        console.log(
            "Update result:",
            result
        );


        if (result.matchedCount > 0) {

            res.send({

                status: 200,

                message:
                    "course data updated successfully",

                data: result,

                recordid: courseId

            });

        }
        else {

            res.send({

                status: 404,

                message: "course not found",

                data: result,

                recordid: courseId

            });

        }

    }
    catch (error) {

        res.send({

            status: 500,

            message:
                "error updating course data",

            error: error.message

        });

    }

};



// =====================================================
// PUT - Update ONLY Course Image
// =====================================================

const updateCourseImage = async (req, res) => {

    try {

        const courseId =
            parseInt(req.params.id);


        // Check image
        if (!req.file) {

            return res.send({

                status: 400,

                message: "Please select an image"

            });

        }


        const db = await connectDB();

        const course =
            db.collection("course");


        const result =
            await course.updateOne(

                { courseid: courseId },

                {
                    $set: {

                        image: req.file.filename

                    }

                }

            );


        console.log(
            "Image update result:",
            result
        );


        if (result.matchedCount > 0) {

            res.send({

                status: 200,

                message:
                    "course image updated successfully",

                image:
                    req.file.filename,

                recordid:
                    courseId

            });

        }
        else {

            res.send({

                status: 404,

                message: "course not found"

            });

        }

    }
    catch (error) {

        console.log(error);

        res.send({

            status: 500,

            message:
                "error updating course image",

            error: error.message

        });

    }

};



// =====================================================
// DELETE - Delete Course
// =====================================================

const deletecoursedata = async (req, res) => {

    try {

        const courseId =
            parseInt(req.query.id);


        const db = await connectDB();

        const course =
            db.collection("course");


        const result =
            await course.deleteOne({

                courseid: {
                    $in: [
                        courseId,
                        String(courseId)
                    ]
                }

            });


        console.log(
            "Course ID:",
            courseId
        );

        console.log(
            "Delete result:",
            result
        );


        if (result.deletedCount > 0) {

            res.send({

                status: 200,

                message:
                    "course data deleted successfully",

                recordid:
                    courseId,

                data: result

            });

        }
        else {

            res.send({

                status: 400,

                message:
                    "failed to delete course data",

                recordid:
                    courseId,

                data: result

            });

        }

    }
    catch (error) {

        res.send({

            status: 500,

            message:
                "error deleting course data",

            error: error.message

        });

    }

};



module.exports = {

    getcoursedata,

    postcoursedata,

    putcoursedata,

    updateCourseImage,

    deletecoursedata

};