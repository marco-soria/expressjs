import Joi from 'joi';
import express from 'express';


const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];



router.get('/', (req, res) => {
    res.send(courses);
});

// router.get('/:id', (req, res) => {
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

router.get('/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
    } else {
        res.send(course);
    }
});

router.post('', (req, res) => {
    const { error }= validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);
        
    
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
    }

    const { error }= validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);
       
    
    course.name = req.body.name;
    res.send(course);

});

router.delete('/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


// router.delete('/:id', (req, res) => {
//     const course = courses.find(course => course.id === parseInt(req.params.id));
//     if (!course) {
//         res.status(404).send('The course with the given ID was not found');
//     }

//     courses = courses.filter(course => course.id !== parseInt(req.params.id));

//     res.send(course);
    
// });

export { router }