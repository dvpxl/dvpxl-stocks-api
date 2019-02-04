/*
* this binds the controller and model to retrieve
* historical stock prices (highs) in array format.
*/

function StockService(ctx) {

  var context = ctx;

  function get_provider_name() {
    return context.name;
  }

  return  {
    list_historical_highs: context.list_historical_highs,
    list_historical_highs_async: context.list_historical_highs_async,
    get_provider_name: context.get_provider_name
  }

};

module.exports = StockService;
