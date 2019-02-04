var request = require('supertest')
  , express = require('express');

var app = require('../app');
var assert = require('assert');

var StockServiceStrategyIEXTrading = require('../models/stock_service_iextrading')();
var StockServiceStrategyStaticText = require('../models/stock_service_static_text')();

//inject the service provider model we want to use

describe('Stocks Service:  Dependency Injection, Provider 1', function() {
  it("it should have the correct data provider name", function(done) {
    var StockService = require('../models/stock_service')(StockServiceStrategyIEXTrading);
    assert.equal(StockService.get_provider_name(), "Stock Data Provider — IEX Trading");
    assert.ok(StockService.list_historical_highs());
    done()
  })
})

describe('Stocks Service:  Dependency Injection, Provider 2', function() {
  it("it should have the correct data provider name", function(done) {
    var StockService = require('../models/stock_service')(StockServiceStrategyStaticText);
    assert.equal(StockService.get_provider_name(), "Stock Data Provider — Static Text File");
    assert.ok(StockService.list_historical_highs());
    done()
  })
})

describe('Stocks Service:  ', function() {
  it("should return 4 when [1,2,3,4,5], test increasing", function(done) {
    var StockService = require('../models/stock_service')(StockServiceStrategyStaticText);
    assert.equal(StockService.get_provider_name(), "Stock Data Provider — Static Text File");
    done()
  })
})
