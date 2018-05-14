const logger = require('morgan');
const express = require('express');
const router = express.Router();
const StockData = require('../models/StockData.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
             { title: 'Stock List',
               stocks: [
                 {
                   'item_name': 'おむつ',
                   'item_num': 1
                 },
                 {
                   'item_name': 'お食事エプロン',
                   'item_num': 2
                 }
               ]
             });
});

router.get('/:family_id', function(req, res, next) {
  StockData.findOne({
    family_id: req.params.family_id
  }, (err, findData) => {
    // 存在しない場合はデフォルトのデータを作成
    if (!findData) {

      let stockData = new StockDate();
      stockData.family_id = req.params.family_id;
      stockData.update_date = Date.now();
      stockData.stocks = [];

      stockData.save((err) => {
        if (err) {
          res.status(500, err);
          return;
        }

        res.render('index',
                   {
                     title: 'Stock List',
                     updateData: '',
                     stocks: []
                   });

      });
    } else {
      let dt = new Date(findData.update_date);
      res.render('index',
                 {
                   title: 'Stock List',
                   updateData: dt.toLocaleString(),
                   stocks: findData.stocks
                 });
    }
  });
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
      res.send(JSON.stringify(findData));
    }
  });
});

// update stock list
router.put('/stock/:family_id', (req, res, next) => {
  let updateData = {
    stocks: req.body,
    update_date: Date.now()
  };

  console.log('req.params.family_id', req.params.family_id);
  console.log('UpdateData', updateData);

  StockData.update({
    family_id: req.params.family_id
  }, {
    $set: updateData
  }, function(err, data) {
    console.log(data);
    if (err) {
      console.error(err);
      res.sendStatus(500, err);
      res.send(500, err);
      return;
    }
    res.sendStatus(200);
  });
});

module.exports = router;










