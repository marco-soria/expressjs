import express from 'express';

import { log } from './middleware/logger.js';
import morgan from 'morgan';
import debug from 'debug';
import { router } from './routes/courses.js';
import { router as home } from './routes/home.js';
const customDebugger = debug('app:startup');

const app = express();

app.set('view engine', 'pug');
//app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/courses', router);
app.use('/', home)


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    customDebugger('Morgan enabled...');
    //console.log('Morgan enabled...');
}


//app.use(log);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});