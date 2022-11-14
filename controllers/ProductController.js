import ProductModel from '../models/Product.js';
import dataOptions from '../dataOptions.js';

export const create = async (req, res) => {
  try {
    const doc = new ProductModel({
      title: req.body.title,
      inverter: req.body.inverter,
      area: req.body.area,
      brand: req.body.brand,
      country: req.body.country,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      rating: req.body.rating,
    });

    const product = await doc.save();

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать товар',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const sortBy = req.query.sortBy;
    const order = req.query.order;
    const inverter = req.query.inverter ? req.query.inverter.split(',') : dataOptions.inverter;
    const minPrice = req.query.minPrice || 0;
    const maxPrice = req.query.maxPrice || 120000;
    const area = req.query.area ? req.query.area.split(',') : dataOptions.area;
    const brand = req.query.brand ? req.query.brand.split(',') : dataOptions.brand;
    const country =
      req.query.country !== 'Все страны' ? req.query.country.split(',') : dataOptions.country;

    let sort = {};
    sort[sortBy] = order;
    sort['_id'] = '1';

    const products = await ProductModel.find({
      $and: [
        { title: { $regex: search, $options: 'i' } },
        { inverter: { $in: inverter } },
        { price: { $gt: minPrice, $lte: maxPrice } },
        { area: { $in: area } },
        { brand: { $in: brand } },
        { country: { $in: country } },
      ],
    })
      .sort(sort)
      .skip(page * limit)
      .limit(limit);

    const total = await ProductModel.countDocuments({
      title: { $regex: search, $options: 'i' },
      inverter: { $in: inverter },
      price: { $gt: minPrice, $lte: maxPrice },
      area: { $in: area },
      brand: { $in: brand },
      country: { $in: country },
    });

    const response = {
      total,
      limit,
      inverterTechnology: dataOptions.inverter,
      areas: dataOptions.area,
      brands: dataOptions.brand,
      countries: dataOptions.country,
      products,
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить товары',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const productId = req.params.id;

    ProductModel.findOne(
      {
        _id: productId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось вернуть товар',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Товар не найден',
          });
        }

        res.json(doc);
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить товар',
    });
  }
};

export const update = async (req, res) => {
  try {
    const productId = req.params.id;

    await ProductModel.updateOne(
      {
        _id: productId,
      },
      {
        title: req.body.title,
        inverter: req.body.inverter,
        area: req.body.area,
        brand: req.body.brand,
        country: req.body.country,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        rating: req.body.rating,
      },
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить товар',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const productId = req.params.id;

    ProductModel.findOneAndDelete(
      {
        _id: productId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить товар',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Товар не найден',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить товар',
    });
  }
};
