// @ts-nocheck
require("../private/string_ext")

const express = require('express');
const fs = require('fs')
var path = require('path');
const router = express.Router();
const { Spot } = require('@binance/connector')

const apiKey = fs.readFileSync(path.join(__dirname, '../private/apikey')).toString()
const apiSecret = fs.readFileSync(path.join(__dirname, '../private/apisecret')).toString()

const client = new Spot(Buffer.from(apiKey, "base64").toString().deobfuscate(), Buffer.from(apiSecret, "base64").toString().deobfuscate())

router.get('/:stockName', function (req, res, next) {
  let stockName = req.params.stockName
  
  client.klines(`${stockName}`, '1d', {
    startTime: new Date("2015-03-25").getTime(),
    endTime: new Date().getTime(),
    limit: 1000
  }).then(response => {
    res.render("stockInfo", {
      title: `Stock ${stockName}`,
      stock: response.data
    })
  })
  .catch(err => {
    res.render("error", {
      title: `Error`,
      message: err
    })
  })
});

module.exports = router;
