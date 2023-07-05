import express from 'express';
import booksRoutes from './routes/books.js';

const app = express();

app.set('port', process.env.PORT || 3000);

//Vas a permitir que el servidor reciba json
app.use(express.json());

// No vas a permitir que el servidor reciba json anidados
app.use(express.urlencoded({extended: false}));

//Vas a permitir que el servidor reciba archivos
app.use(express.static('public'));

app.use(booksRoutes);

export default app;