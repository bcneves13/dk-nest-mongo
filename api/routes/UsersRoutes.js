import express from 'express';
import UsersController  from '../controllers/UsersController.js';

// Router instance
const UsersRoutes = express.Router();
// Router paths
UsersRoutes.get('/', UsersController.cron);
UsersRoutes.get('/list', UsersController.list);
UsersRoutes.get('/users-report', UsersController.exportFiles);

export default UsersRoutes;