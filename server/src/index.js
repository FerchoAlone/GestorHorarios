import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import routerAcademicPeriod from './routes/routesAcademicPeriod.js';


//Inicilization
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
//Settings
dotenv.config();
app.set('port', process.env.PORTSERVER || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Routes
app.get('/', (req, res) => {
  res.json({'Messagge':'Online'});
});

app.use(routerAcademicPeriod);

//Public files
app.use(express.static(join(__dirname, 'public')));
//Run server
app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port'));
});
