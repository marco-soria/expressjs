import express from 'express';
import Joi from 'joi';

const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// app.get('/api/courses/:id', (req, res) => {
//     courses.find(course => {
//         if (course.id === parseInt(req.params.id)) {
//             res.send(course);
//         } else {
//             res.status(404).send('The course with the given ID was not found');
//         }
//     });
// });

const validateCourse = course => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
};

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
    } else {
        res.send(course);
    }
});

app.post('/api/courses', (req, res) => {
    const { error }= validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);
        
    
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
    }

    const { error }= validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);
       
    
    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


// app.delete('/api/courses/:id', (req, res) => {
//     const course = courses.find(course => course.id === parseInt(req.params.id));
//     if (!course) {
//         res.status(404).send('The course with the given ID was not found');
//     }

//     courses = courses.filter(course => course.id !== parseInt(req.params.id));

//     res.send(course);
    
// });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});