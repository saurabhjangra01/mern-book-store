import express from "express";
import mongoose from "mongoose";
import { PORT, MONGO_URI } from "./config.js";
import booksRoute from './routes/booksRoute.js';
import cors from "cors";


const app = express();

// Middlewares

// for parsing re body
app.use(express.json());

// for handling CORS
// option: 1 -> Allow all origins with default value of * for cors
app.use(cors());

// option: 2 -> Allow custom origins
// app.use(cors({
//     origin: '',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

// routes
// home route
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Book Store - MERN')
});

// Routes Middlewares
app.use('/books', booksRoute);



// Connecting to database
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('############# Mongo Connected #############');

        // connecting to server
        app.listen(PORT, () => {
            console.log(`############# Express connected on PORT: ${PORT} #############`);
        });
    })
    .catch((error) => {
        console.log(error);
    })