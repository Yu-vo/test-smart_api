const Product = require('./models');

exports.create = async (req, res) => {
  try {
    new Product({ ...req.body }).save();
    return res.status(201).send('Created');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error!' });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const arrTitle = req.body.string.split(' ').map((item) => ({ title: new RegExp(`${item}`) }));
    const arrBrand = req.body.string.split(' ').map((item) => ({ brand: new RegExp(`${item}`) }));
    const minPrice = req.body.parameters.price.min;
    const maxPrice = req.body.parameters.price.max;
    const categoryValue = req.body.parameters.category;
    const min = minPrice.length > 0 ? { price: { $gte: minPrice } } : {};
    const max = maxPrice.length > 0 ? { price: { $lte: maxPrice } } : {};
    const category = categoryValue.length > 0 ? { category: categoryValue } : {};

    const products = await Product.find({
      $and: [
        {
          $or: arrTitle.concat(arrBrand),
        },
        min,
        max,
        category,
      ],
    }).exec();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error!' });
  }
};
