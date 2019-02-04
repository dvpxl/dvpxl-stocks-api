## simple stock historical analysis (experimental) 

**Description**:  

This is based on the nodejs express framework which uses historical, stock prices to calculate a theoretical maximum profit.

##### Setup / Installation:

```
npm version >= 4.2.0
Check your version by running:
%> npm --version

node version >= v7.10.1
Check your version by running:
%> node --version

```

**Run Project**:

To run the project, go to the root folder and type `npm install` to install dependencies

```
%> npm install
```

Then simply:

1. View in browser to following endpoint,
2. or make REST API call to the following endpoint:

```
http://localhost:3000/stocks/maximum_profit?symbol=AAPL

Usage Example:
/stocks/maximum_profit?symbol=TICKER_SYMBOL
```

Result will be in json format:

```
{"result":41.7919}
```

**Tests**:

```
%> npm install
%> npm test

//output
> app@0.0.0 test /app
> mocha

  API - /stocks/maximum_profit
GET /stocks/maximum_profit?symbol=AAPL 200 417.550 ms - 18
    ✓ response with correct ticker (445ms)

  API - /stocks/maximum_profit
GET /stocks/maximum_profit?symbol=UNKNOWN 400 187.916 ms - 26
    ✓ should return bad response if unknown ticker (193ms)

  Stocks Controller:  _calculate_maximum_profit()
    ✓ should return 4 when [1,2,3,4,5], stock price increasing

  Stocks Controller:  _calculate_maximum_profit()
    ✓ should return 0 when [10,9,8,7,6,5], stock price decreasing

  Stocks Controller:  _calculate_maximum_profit()
    ✓ should return 0 when all negative numbers [-1,-2,-3], test negative

  Stocks Controller:  _calculate_maximum_profit()
    ✓ min_value is in middle of array and DOES NOT contribute to profit

  Stocks Controller:  _calculate_maximum_profit()
    ✓ check correct value when min_value in middle and contributes to profit

  Stocks Controller:  _calculate_maximum_profit()
    ✓ check correct value using floating point numbers

  Stocks Controller:  _calculate_maximum_profit()
    ✓ check correct value when min_value at end

  Stocks Controller:  _calculate_maximum_profit()
    ✓ timeout test with long array

  Index Page
GET / 200 61.438 ms - 261
    ✓ renders successfully (63ms)

  Stocks Service:  Dependency Injection, Provider 1
    ✓ it should have the correct data provider name

  Stocks Service:  Dependency Injection, Provider 2
    ✓ it should have the correct data provider name

  Stocks Service:  
    ✓ should return 4 when [1,2,3,4,5], test increasing


  14 passing (717ms)

```

**Folder Hierarchy**

```
app.js
controllers/ 	- stock controllers
models/			- models
package.json
routes/			- api endpoint routes
test/ 			- sample test files
views/
```



**Multiple Datasources:**

Take a look at the top of the **stock_controller.js** file.

We bind the datasource we wish to use.   Below, we see more explanation how this works.

```
var StockService
  = require('../models/stock_service')(StockServiceStrategyIEXTrading);
  
```



**stock_service.js**

1. This class acts like an interface .. and exposes the methods below bridging the stock_controller and data layer.
2. We use a strategy data pattern to pass in new data provider.   This will allow us to switch to a different 3rd party service if needed.

```javascript
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

```

**stock_service_iextrading.js**

1. This implements the above stock service provider by implementing same methods as **stock_service.js**.   
2. These methods here are:  list_historical_highs, list_historical_highs_async, get_provider_name

```javascript
var request = require('request');

var StockServiceStrategyIEXTrading = function() {

  var name = "Stock Data Provider — IEX Trading";

  //var url = "https://api.iextrading.com/1.0/stock/aapl/chart/1y";
  var scheme = "https://"
  var host = "api.iextrading.com/1.0/stock"

  function list_historical_highs_async(symbol, days, cb) {
    var symbol = symbol
    var days = 180;

    var path = "/" + symbol+ "/"+ "chart/1y"
    var url = scheme + host + path;

    //make the request to 3rd party service
    _make_request_async(url, function(success, error){
        if(success) {
          var normalized = success.map(function(item, index, array){
              return item.high;
          });
          cb(normalized, null);
        } else {
          cb(null, error);
        }
    })
  };

  function get_provider_name() {
    return name;
  }

  function _make_request_async(url, cb) {
    request(url, {json:true}, function (error, response, body) {
      if(error || (response && response.statusCode != 200)) {
        cb(null, body)
      }
      else {
        //success
        cb(body, null);
      }

    });

  };
    return data;
  }

  // we will only support the list_historical_highs_async api call here
  return {
    list_historical_highs: list_historical_highs,
    list_historical_highs_async: list_historical_highs_async,
    get_provider_name:get_provider_name

  }

}

module.exports = StockServiceStrategyIEXTrading

```

