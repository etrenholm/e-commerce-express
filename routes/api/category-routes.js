const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories and include associated Products
router.get('/', (req, res) => {
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

// GET one category by its `id` and include associated Products
router.get('/:id', (req, res) => {
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

// POST a new category
router.post('/', (req, res) => {
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

// UPDATE a category by its `id`
router.put('/:id', (req, res) => {
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
      res.status(404).json({ message: 'No category found with this id.' })
      return;
    }
    res.json(categoryData)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

// DELETE a category by its `id`
router.delete('/:id', (req, res) => {
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
    res.status(500).json(err);
  })
});

module.exports = router;
