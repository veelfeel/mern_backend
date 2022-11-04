import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import data from './data.js';
import config from './config.js';

import { registerValidation, loginValidation } from './validation.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { register, login, getMe } from './controllers.js';

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => console.log('Not connected to mongodb', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/register', registerValidation, handleValidationErrors, register);
app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.get('/auth/me', checkAuth, getMe);

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('server at http://localhost:5000');
});
