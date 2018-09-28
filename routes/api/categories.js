const express = require('express');
const Category = require('../../models/category');
const sessionCheck = require('../middleware/authentication');

const router = express.Router();

//router.post('/', sessionCheck, (req, res) => {
router.post('/', (req, res) => {
  let { name } = req.body;
  if (name) {
    name = name.toLowerCase();
  }
  Category.findOne({ name }, (err, cat) => {
    if (cat !== null) {
      res.status(401);
      return res.send('A category with this name already exists');
    }
    const category = new Category({ name });
    return category.save((error) => {
      if (error) {
        res.status(500);
        return res.send(error);
      }
      res.status(200);
      return res.send(category);
    });
  });
});

router.get('/', (req, res) => {
  Category.find((err, categories) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    res.status(200);
    return res.json(categories);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne({ _id: req.params.id }, (err, category) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    res.status(200);
    return res.json(category);
  });
});

router.get('/name/:name', (req, res) => {
  Category.findOne({ name: req.params.name }, (err, category) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    res.status(200);
    return res.json(category);
  });
});

//router.put('/:_id', sessionCheck, (req, res) => {
router.put('/:_id', (req, res) => {
  Category.findOneAndUpdate({ _id: req.params._id },
    {
      $set: { name: req.body.name.toLowerCase() },
    },
    { new: true },
    (err, category) => {
      if (err) {
        res.status(500);
        return res.send(err);
      }
      res.status(200);
      return res.json(category);
    });
});

//router.delete('/:_id', sessionCheck, (req, res) => {
router.delete('/:_id', (req, res) => {
  const id = req.params._id;
  Category.remove({ _id: req.params._id }, (err) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    res.status(200);
    return res.json(id);
  });
});

module.exports = router;
