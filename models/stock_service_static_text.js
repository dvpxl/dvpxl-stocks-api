/*
* This is a sample "mock" data provider and is hard coded.
* Use this as a template to create another data source
*/

var StockServiceStrategyStaticText = function(name) {

  var name = "Stock Data Provider — Static Text File";

  function list_historical_highs(symbol, days) {
    var data = [141.7081, 142.6433, 142.348, 141.9148, 142.0526, 144.9075]
    return data;
  }

  function list_historical_highs_async(symbol, days) {
    // TODO: not implemented
  }

  function get_provider_name() {
    return name;
  }

  return {
    list_historical_highs: list_historical_highs,
    list_historical_highs_async: list_historical_highs_async,
    get_provider_name: get_provider_name
  }

}

module.exports = StockServiceStrategyStaticText
