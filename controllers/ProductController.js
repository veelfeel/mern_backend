import ProductModel from '../models/Product.js';

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
    // const sort = req.query.sort;
    let inverter = req.query.inverter || 'All';
    let area = req.query.area || 'All';
    let brand = req.query.brand || 'All';
    let country = req.query.country;

    const inverterOptions = ['есть', 'нет'];
    const areaOptions = [
      '15 м² - 20 м²',
      '25 м² - 30 м²',
      '30 м² - 40 м²',
      '40 м² - 50 м²',
      '60 м² - 70 м²',
      '70 м² - 80 м²',
      '100 м²',
    ];
    const brandOptions = [
      'Rovex',
      'JAX',
      'Ballu',
      'Electrolux',
      'Zanussi',
      'Toshiba',
      'Shuft',
      'Denko',
      'Centek',
      'Lessar',
    ];
    const countryOptions = ['Все страны', 'Турция', 'Китай', 'Франция', 'Италия'];

    inverter === 'All'
      ? (inverter = [...inverterOptions])
      : (inverter = req.query.inverter.split(','));
    area === 'All' ? (area = [...areaOptions]) : (area = req.query.area.split(','));
    brand === 'All' ? (brand = [...brandOptions]) : (brand = req.query.brand.split(','));
    country === 'Все страны'
      ? (country = [...countryOptions])
      : (country = Array(req.query.country));

    const products = await ProductModel.find({ title: { $regex: search, $options: 'i' } })
      .where('inverter')
      .in([...inverter])
      .where('area')
      .in([...area])
      .where('brand')
      .in([...brand])
      .where('country')
      .in([...country])
      // .sort({ price: 'asc' })
      .skip(page * limit)
      .limit(limit)
      .exec();

    const total = await ProductModel.countDocuments({
      inverter: { $in: [...inverter] },
      area: { $in: [...area] },
      brand: { $in: [...brand] },
      country: { $in: [...country] },
      title: { $regex: search, $options: 'i' },
    });

    const response = {
      total,
      limit,
      inverterTechnology: inverterOptions,
      areas: areaOptions,
      brands: brandOptions,
      countries: countryOptions,
      products,
    };

    // setTimeout(() => {
    res.json(response);
    // }, 150);
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
