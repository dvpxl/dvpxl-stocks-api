var request = require('supertest')
  , express = require('express');

var app = require('../app');
var assert = require('assert');

var StockController         = require('../controllers/stock_controller');

//test increasing numbers.
//result should be value of (last element - first element)
describe('Stocks Controller:  _calculate_maximum_profit()', function() {
  it("should return 4 when [1,2,3,4,5], stock price increasing", function(done) {
    var data = [1,2,3,4,5];
    var result = StockController._calculate_maximum_profit(data);
    assert.equal(result, 4);
    done()
  })
})

describe('Stocks Controller:  _calculate_maximum_profit()', function() {
  it("should return 0 when [10,9,8,7,6,5], stock price decreasing", function(done) {
    var data = [5,4,3,2,1];
    var result = StockController._calculate_maximum_profit(data);
    assert.equal(result, 0);
    done()
  })
})

describe('Stocks Controller:  _calculate_maximum_profit()', function() {
  it("should return 0 when all negative numbers [-1,-2,-3], test negative", function(done) {
    var data = [-1,-2,-3];
    var result = StockController._calculate_maximum_profit(data);
    assert.equal(result, 0);
    done()
  })
})

describe('Stocks Controller:  _calculate_maximum_profit()', function() {
  it("min_value is in middle of array and DOES NOT contribute to profit", function(done) {
    var data = [2,4,6,1,2];
    var result = StockController._calculate_maximum_profit(data);
    assert.equal(result, 4);
    done()
  })
})

describe('Stocks Controller:  _calculate_maximum_profit()', function() {
  it("check correct value when min_value in middle and contributes to profit", function(done) {
    var data = [2,4,6,1,10,2,5];
    var result = StockController._calculate_maximum_profit(data);
    assert.equal(result, 9);
    done()
  })
})

describe('Stocks Controller:  _calculate_maximum_profit()', function() {
  it("check correct value using floating point numbers", function(done) {
    var data = [1.00, 1.50, 2.00, 3.00];
    var result = StockController._calculate_maximum_profit(data);
    assert.equal(result, 2.00);
    assert.notEqual(result, 2.01);
    done()
  })
})

describe('Stocks Controller:  _calculate_maximum_profit()', function() {
  it("check correct value when min_value at end", function(done) {
    var data = [2,6,1];
    var result = StockController._calculate_maximum_profit(data);
    assert.equal(result, 4);
    done()
  })
})

describe('Stocks Controller:  _calculate_maximum_profit()', function() {
  it("timeout test with long array", function(done) {
    var data = [2,6,1];
    var result = StockController._calculate_maximum_profit(data);
    assert.equal(result, 4);
    done()
  })
})
