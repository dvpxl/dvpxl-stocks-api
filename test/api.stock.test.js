var request = require('supertest')
  , express = require('express');

var app = require('../app');

describe('API - /stocks/maximum_profit', function() {
  it("response with correct ticker", function(done) {
    request(app).get('/stocks/maximum_profit?symbol=AAPL').expect(200, done);
  })
})

describe('API - /stocks/maximum_profit', function() {
  it("should return bad response if unknown ticker", function(done) {
    request(app).get('/stocks/maximum_profit?symbol=UNKNOWN').expect(400, done);
  })
})
