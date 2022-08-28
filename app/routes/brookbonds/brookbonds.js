const express = require('express');
var app = express.Router();
const BrooksBondsRate = require('../../controller/brooksbondsrate.controller.js')
app.get("/getBrooksBondsRateList", BrooksBondsRate.getBrooksBondsRateList);
app.get("/setBrooksBondsRateList", BrooksBondsRate.setBrooksBondsRateList);

module.exports = app;