import ProductModel from '../models/Product.js';

export const create = async (req, res) => {
  try {
    const doc = new ProductModel({
      title: req.body.title,
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
    const search = req.query.search || '';
    // const page = req.query.page;
    // const limit = req.query.limit;
    // const sort = req.query.sort;

    const posts = await ProductModel.find({ title: { $regex: search, $options: 'i' } })
      // .sort({ price: 'asc' })
      // .skip(8)
      // .limit(4)
      .exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить товары',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    ProductModel.findOne(
      {
        _id: postId,
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
    const postId = req.params.id;

    await ProductModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
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
    const postId = req.params.id;

    ProductModel.findOneAndDelete(
      {
        _id: postId,
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
