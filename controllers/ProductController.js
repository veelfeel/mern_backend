import ProductModel from '../models/Product.js';

export const create = async (req, res) => {
  try {
    const doc = new ProductModel({
      title: req.body.title,
      brand: req.body.brand,
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
    let brand = req.query.brand || 'All';

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

    brand === 'All' ? (brand = [...brandOptions]) : (brand = req.query.brand.split(','));

    const products = await ProductModel.find({ title: { $regex: search, $options: 'i' } })
      .where('brand')
      .in([...brand])
      // .sort({ price: 'asc' })
      .skip(page * limit)
      .limit(limit)
      .exec();

    const total = await ProductModel.countDocuments({
      brand: { $in: [...brand] },
      title: { $regex: search, $options: 'i' },
    });

    const response = {
      total,
      limit,
      brands: brandOptions,
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
        brand: req.body.brand,
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
