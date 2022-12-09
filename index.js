import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config.js";

import {
  registerValidation,
  loginValidation,
  productCreateValidation,
} from "./validation.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import {
  UserController,
  ProductController,
  AddProductController,
} from "./controllers/index.js";

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Not connected to mongodb", err));

const app = express();

app.use(express.json());
app.use(cors());

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post(
  "/api/products",
  checkAuth,
  productCreateValidation,
  handleValidationErrors,
  ProductController.create
);
app.get("/api/products", ProductController.getAll);
app.get("/api/products/:id", ProductController.getOne);
app.patch(
  "/api/products/:id",
  checkAuth,
  productCreateValidation,
  handleValidationErrors,
  ProductController.update
);
app.delete("/api/products/:id", checkAuth, ProductController.remove);

app.get("/api/areas", AddProductController.getAreas);
app.get("/api/brands", AddProductController.getBrands);
app.get("/api/countries", AddProductController.getCountries);

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server at http://localhost:5000");
});
