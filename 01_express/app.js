import express from 'express';

const app = express();

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



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});