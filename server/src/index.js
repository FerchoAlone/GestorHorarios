import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import routerEnviroment from './routes/routesEnvironment.js';
import routerApiProgramCompetence from './routes/routesApiProgramsCompetences.js';
import routerLogin from './routes/routeLogin.js';

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
app.get('/login', (req, res) => {
  res.json({'Messagge':'Online'});
});

app.use(routerEnviroment);
app.use(routerApiProgramCompetence);
app.use(routerLogin);

//Public files
app.use(express.static(join(__dirname, 'public')));
//Run server
app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port'));
});
