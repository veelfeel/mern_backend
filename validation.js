import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватар").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

export const productCreateValidation = [
  body("title", "Введите название товара").isLength({ min: 1 }).isString(),
  body("inverter", "Введите поддержку инверторной технологии")
    .isLength({ min: 1 })
    .isString(),
  body(
    "area",
    'Введите площадь помещения (Доступные варианты: "15 м² - 20 м²", "25 м² - 30 м²", "30 м² - 40 м²", "40 м² - 50 м²", "60 м² - 70 м²", "70 м² - 80 м²", "100 м²")'
  )
    .isLength({ min: 1 })
    .isString(),
  body("brand", "Введите название бренда").isLength({ min: 1 }).isString(),
  body("country", "Введите страну производителя")
    .isLength({ min: 1 })
    .isString(),
  body("price", "Введите цену товара").isLength({ min: 1 }).isNumeric(),
  body("imageUrl", "Неверная сылка на изображение").optional().isString(),
  body("rating", "Добавьте рейтинг").isLength({ min: 1 }).isNumeric(),
];
