import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import CollaboratorController from './app/controllers/CollaboratorController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// Rotas autenticadas
routes.use(authMiddleware);
routes.put('/users', UserController.updade);

// Rota de agendamento 
routes.post('/appointments', AppointmentController.store);

// Listagem de agendamento
routes.get('/appointments', AppointmentController.index);

// Lista todos os colaboradores
routes.get('/collaborator', CollaboratorController.index);

// listagem de agendamentos colaborador
routes.get('/schedule', ScheduleController.index);

// Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

export default routes;

