const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  // find all categories and include associated Products
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
  .then((categoryData) => {
    res.json(categoryData)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value and include associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id.' })
      return;
    }
    res.json(categoryData)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then((categoryData) => {
    res.json(categoryData)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then((categoryData) => {
    if (!categoryData) {
      console.log(err)
      res.status(404).json({ message: 'No category found with this id.' })
      return;
    }
    res.json(categoryData)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id.' })
      return;
    }
    res.json(categoryData)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json(err);
  })
});

module.exports = router;
