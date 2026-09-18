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
router.get('/teachergetdata',tt.getteacherdata);
router.post('/teacherpostdata',tt.postteacherdata);
router.put('/teacherputdata/:id', tt.putteacherdata);
router.delete('/teacherdeletedata',tt.deleteteacherdata);//when give query parameter in url then we use req.query.id to get the id from the url and when give parameter in url then we use req.params.id to get the id from the url
//different urls for the same functionality

//for students
router.get('/studentgetdata',st.getstudentdata);
router.post('/studentpostdata',st.poststudentdata);
router.put('/studentputdata/:id', st.putstudentdata);
router.delete('/studentdeletedata',st.deletestudentdata);

//for courses
router.get('/coursegetdata',ct.getcoursedata);
router.post('/coursepostdata',ct.postcoursedata);
router.put('/courseputdata/:id', ct.putcoursedata);
router.delete('/coursedeletedata',ct.deletecoursedata);//?id=1 in postman url

//for users
router.get('/usergetdata',ctt.getuserdata);
router.post('/userpostdata',ctt.postuserdata);
router.put('/userputdata/:id', ctt.putuserdata);
router.delete('/userdeletedata',ctt.deleteuserdata);//?id=1 in postman url


module.exports=router;
