import express from 'express';
import fileupload from 'express-fileupload';
import 'dotenv/config';
import UsersRoutes from '../api/routes/UsersRoutes.js';
import GoFilesRoutes from '../api/routes/GoFilesRoutes.js';
import Connect from './bin/mongo.js';

const app = express();
app.use(fileupload());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/users', UsersRoutes);
app.use('/go-files', GoFilesRoutes);

Connect()

app.listen(process.env.PORT, () => {
    console.log(`server running on port: ${process.env.PORT}`)
})