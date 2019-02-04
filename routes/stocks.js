var express = require('express');
var router = express.Router();
var StockController         = require('../controllers/stock_controller');

/**
* returns the maximum profit using historical high prices from last N days
* @query_param symbol (required) -  ticker symbol
* @query_param days   (required) -  last n days.
*
* Today, days is not implemented and will default to last 6 months.
*/

router.get('/maximum_profit', function(req, res, next){
  var ticker_symbol = req.query.symbol;
  var days = req.query.days;

  StockController.maximum_profit_async(ticker_symbol, "180",
      //handle the response back to client
      function(success, error) {
          if(success) {
            res.send({"result": success});
          } else {
            res.status(400);
            res.send({"error": error});
          }
      });
})


module.exports = router;
