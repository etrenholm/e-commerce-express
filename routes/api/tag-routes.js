const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags and include associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: {
      model: Product,
      attributes: [
        'product_name',
        'price',
        'stock',
        'category_id'
      ]
    }
  })
  .then((tagData) => {
    res.json(tagData)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

// GET a single tag by its `id` and include associated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: [
        'product_name',
        'price',
        'stock',
        'category_id'
      ]
    }
  })
  .then((tagData) => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id.' })
      return;
    }
    res.json(tagData)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

// POST a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((tagData) => {
    res.json(tagData)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

// UPDATE a tag's name by its `id`
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then((tagData) => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id.' })
      return;
    }
    res.json(tagData)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

// DELETE on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((tagData) => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id.' })
      return;
    }
    res.json(tagData)
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

module.exports = router;
