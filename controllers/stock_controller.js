var StockServiceStrategyIEXTrading = require('../models/stock_service_iextrading')();
var StockServiceStrategyStaticText = require('../models/stock_service_static_text')();

//inject the stock provider we want to use
var StockService
  = require('../models/stock_service')(StockServiceStrategyIEXTrading);

// get the maximum profit using historical high data
function maximum_profit (symbol, days, cb) {
  var data = StockService.list_historical_highs();   //high profits returned as array [1,2,3, ...]
  return _calculate_maximum_profit(data);

}

// (async) get the maximum profit using historical high data
function maximum_profit_async(symbol, days, cb) {
  StockService.list_historical_highs_async(symbol, days, function(success, error){
      if(success) {
        var result = _calculate_maximum_profit(success);
        cb(result);
      } else {
        cb(null, error);
      }
  })
}

// private function to calculate the maximum profit
function _calculate_maximum_profit(arr) {
  var min = (arr.length > 0) ? arr[0] : 0;
  var max = 0;
    for(var i=0; i<arr.length; i++) {
      if(arr[i] < min)                  min = arr[i];
      else if(arr[i] - min > max)       max = arr[i] - min;
    }
  return max;
}

module.exports = {
  maximum_profit: maximum_profit,
  maximum_profit_async: maximum_profit_async,
  _calculate_maximum_profit: _calculate_maximum_profit
}
