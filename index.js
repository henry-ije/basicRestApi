 const Joi = require("joi");
 const express = require("express");
 const app = express()

 app.use(express.json())

 const courses = [
    {
        id:1, 
        name: "course1"
    },
    {
        id:2, 
        name: "course2"
    },
    {
        id:3, 
        name: "course3"
    }
 ]

 app.get('/', (req, res)=>{
    res.write("Hello World")
 })

 app.get("/api/courses", (req, res)=> {
    if (!req.body.name || req.body.name.length < 3){
        //400 Bad Request
        res.status(400).send("Name is required and should be minimum 3 characters")
        //Avoid other code from runing
        return;
    }
    res.send(courses);
 })

  // /api/courses/1
  app.get("/api/courses/:id", (req, res)=> {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
        return res.status(404).send("The course with the given ID was not found")
        res.send(course);}
 })

 app.post("/api/courses", (req, res)=>{
    //Define your schema
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
}
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course)
    res.send(course)
 })

app.put('/api/courses/:id', (req, res)=> {
    //Look up the course 
    const course = courses.find(c => c.id === parseInt(req.params.id));
        //If not existing, return 404
    if (!course) return res.status(404).send("The course with the given ID was ")
    //Validate
    //If invalid, return 400 - Bad request
    // const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
    return;    
}
    //Update course
    course.name = req.body.name;
    res.send(course);
    //Return 
})

app.delete("/api/courses/:id", (req, res)=> {
    //Look up the code 
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {res.status(404).send("The course with the given ID was")
    return
}
    //Delete
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    //return
    res.send(course)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}




 //PORT 
 const port = process.env.PORT || 3000;
 app.listen(port, ()=> console.log(`Listen on port ${port}`)
 )
 




//  app.post()
//  app.put()
//  app.delete()