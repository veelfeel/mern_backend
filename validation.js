import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const productCreateValidation = [
  body('title', 'Введите название товара').isLength({ min: 3 }).isString(),
  body('price', 'Введите цену товара').isLength({ min: 3 }).isNumeric(),
  body('imageUrl', 'Неверная сылка на изображение').optional().isString(),
];
