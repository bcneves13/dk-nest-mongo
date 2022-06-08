import express from 'express';
import GoFilesController  from '../controllers/GoFilesController.js';

// Router instance
const GoFileRoutes = express.Router();
// Router paths
GoFileRoutes.get('/files', GoFilesController.list);
GoFileRoutes.post('/create-folder', GoFilesController.createFolder);
GoFileRoutes.post('/upload-file', GoFilesController.uploadFile);
GoFileRoutes.delete('/file', GoFilesController.deleteFile);


export default GoFileRoutes;
