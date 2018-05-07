var mongoose = require('mongoose');

var StockDataSchema = new mongoose.Schema({
  family_id: {type: String, required: true},
  update_date: {type: Number, required: true},
  stocks: { type: Array, required: true}
});
var StockData = mongoose.model('stock_data', StockDataSchema);

module.exports = StockData;
