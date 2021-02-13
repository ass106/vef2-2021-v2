import express from 'express';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { router } from './src/registration.js';

dotenv.config();

const app = express();

const path = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(path, './public')));
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(router);

function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err); // eslint-disable-line
  res.send('error');
}

app.use(errorHandler);

const {
  PORT: port = 3000,
} = process.env;

app.listen(port, () => {
  console.info(`App running on http://localhost:${port}`); // eslint-disable-line
});