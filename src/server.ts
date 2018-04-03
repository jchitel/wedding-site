import express from 'express';
import path from 'path';


const app = express();

// static files
app.use(express.static(path.resolve(__dirname, '..', 'build', 'bundle')));

export default app;
