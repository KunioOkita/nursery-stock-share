const logger = require('morgan');
const express = require('express');
const router = express.Router();
const StockData = require('../models/StockData.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '保育園ストックリスト' });
});

// get stock by family_id
router.get('/stock/:family_id', (req, res, next) => {
  StockData.findOne({
    family_id: req.params.family_id
  }, (err, findData) => {
    res.setHeader('Content-Type', 'application/json');
    if (!findData) {
      res.send(JSON.stringify([]));
    } else {
      res.send(JSON.stringify(findData.stocks));
    }
  });
});

// update stock list
router.put('/stock/:family_id', (req, res, next) => {
  let parsedBody = JSON.parse(req.body);
  let updateData = {
    stocks: parsedBody
  };

  StockData.update({
    family_id: req.params.family_id
  }, {
    $set: updateData
  }, function(err, data) {
    if (err) {
      console.error(err);
      return;
    }
  });

  res.send(200);
});

module.exports = router;
