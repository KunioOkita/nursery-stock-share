var mongoose = require('mongoose');

var StockDataSchema = new mongoose.Schema({
  family_id: {type: String, required: true},
  stocks: { type: Array, required: true}
});
var StockData = mongoose.model('stock_data', StockDataSchema);

module.exports = StockData;
