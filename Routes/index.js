const express=require('express');
const router=express.Router();

//for studentlist
const list=require('../studentlist.json');
const st=require('../Controller/student.js');
//for teacherlist
const listt=require('../teacherlist.json');
const tt=require('../Controller/teacher.js');

//for courselist
const listtt=require('../courselist.json');
const ct=require('../Controller/course.js');

const listttt=require('../userlist.json');
const ctt=require('../Controller/user.js');

//Student Api
router.get("/home",(req,res)=>{

    res.render("home",{
        name:"ritika"
    });
});
router.get("/studentlist",(req,res)=>
{
    const listnew=[
        {
            id:101,
            name:"Ritika",
            email:"ritika.@gmail.com",
            age:21  ,
            city:"Pune",
        "course":"MERN",
        marks:90
        },
        {
            id:102,
            name:"nikita",
            email:"nikita@gmail.com",
            age:20,
            city:"Mumbai",
            course:"MERN",
            marks:85
        },
        {
            id:103,
            name:"mohit",
            email:"mohit@gmail.com",
            age:20,
            city:"Sirsa",
            course:"java",
            marks:70
        },
        {
            id:104,
            name:"raveena",
            email:"ravi@gmail.com",
            age:22,
            city:"Hisar",
            course:"Python",
            marks:80
        }
    ];
    res.render("student",{listnew})
});



//for teachers
// ================= TEACHER APIs =================

/**
 * @swagger
 * /teachergetdata:
 *   get:
 *     summary: Get all teacher data
 *     tags:
 *       - Teacher
 *     responses:
 *       200:
 *         description: Successfully retrieved teacher data
 */
router.get('/teachergetdata', tt.getteacherdata);


/**
 * @swagger
 * /teacherpostdata:
 *   post:
 *     summary: Add a new teacher
 *     tags:
 *       - Teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Teacher added successfully
 */
router.post('/teacherpostdata', tt.postteacherdata);


/**
 * @swagger
 * /teacherputdata/{id}:
 *   put:
 *     summary: Update teacher data
 *     tags:
 *       - Teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 */
router.put('/teacherputdata/:id', tt.putteacherdata);


/**
 * @swagger
 * /teacherdeletedata:
 *   delete:
 *     summary: Delete teacher data
 *     tags:
 *       - Teacher
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 */
router.delete('/teacherdeletedata', tt.deleteteacherdata);//when give query parameter in url then we use req.query.id to get the id from the url and when give parameter in url then we use req.params.id to get the id from the url
//different urls for the same functionality

// ================= STUDENT APIs =================

/**
 * @swagger
 * /studentgetdata:
 *   get:
 *     summary: Get all student data
 *     description: Fetch all students from the database
 *     tags:
 *       - Student
 *     responses:
 *       200:
 *         description: Successfully retrieved student data
 *       500:
 *         description: Server error
 */
router.get('/studentgetdata', st.getstudentdata);


/**
 * @swagger
 * /studentpostdata:
 *   post:
 *     summary: Add a new student
 *     description: Add student information to the database
 *     tags:
 *       - Student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               city:
 *                 type: string
 *               course:
 *                 type: string
 *               marks:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Student added successfully
 *       500:
 *         description: Server error
 */
router.post('/studentpostdata', st.poststudentdata);


/**
 * @swagger
 * /studentputdata/{id}:
 *   put:
 *     summary: Update student data
 *     description: Update student information using student ID
 *     tags:
 *       - Student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 */
router.put('/studentputdata/:id', st.putstudentdata);


/**
 * @swagger
 * /studentdeletedata:
 *   delete:
 *     summary: Delete student data
 *     description: Delete a student using ID
 *     tags:
 *       - Student
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete('/studentdeletedata', st.deletestudentdata);
//for courses
// ================= COURSE APIs =================

/**
 * @swagger
 * /coursegetdata:
 *   get:
 *     summary: Get all course data
 *     tags:
 *       - Course
 *     responses:
 *       200:
 *         description: Successfully retrieved course data
 */
router.get('/coursegetdata', ct.getcoursedata);


/**
 * @swagger
 * /coursepostdata:
 *   post:
 *     summary: Add a new course
 *     tags:
 *       - Course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Course added successfully
 */
router.post('/coursepostdata', ct.postcoursedata);


/**
 * @swagger
 * /courseputdata/{id}:
 *   put:
 *     summary: Update course data
 *     tags:
 *       - Course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
router.put('/courseputdata/:id', ct.putcoursedata);


/**
 * @swagger
 * /coursedeletedata:
 *   delete:
 *     summary: Delete course data
 *     tags:
 *       - Course
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course deleted successfully
 */
router.delete('/coursedeletedata', ct.deletecoursedata);//?id=1 in postman url

//for users
// ================= USER APIs =================

/**
 * @swagger
 * /usergetdata:
 *   get:
 *     summary: Get all user data
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 */
router.get('/usergetdata',ctt.getuserdata);
/**
 * @swagger
 * /userpostdata:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post('/userpostdata',ctt.postuserdata);
/**
 * @swagger
 * /userlogindata:
 *   post:
 *     summary: User login
 *     description: Check username and password and send OTP to registered email
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful and OTP sent
 *       401:
 *         description: Invalid username or password
 */

router.post("/userlogindata", ctt.userlogin);
/**
 * @swagger
 * /verifyotp:
 *   post:
 *     summary: Verify OTP
 *     description: Verify the OTP sent to the user's registered email
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - otp
 *             properties:
 *               username:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       401:
 *         description: Invalid OTP
 */
router.post("/verifyotp", ctt.verifyotp);
/**
 * @swagger
 * /userputdata/{id}:
 *   put:
 *     summary: Update user data
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 */

router.put('/userputdata/:id', ctt.putuserdata);
/**
 * @swagger
 * /userdeletedata:
 *   delete:
 *     summary: Delete user data
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/userdeletedata',ctt.deleteuserdata);//?id=1 in postman url


module.exports=router;
