const BrooksBondsRate = require('../models/brooksbondsrate.model.js');

 exports.getBrooksBondsRateList = (req, res) => {
    try{
      BrooksBondsRate.find().sort({
        _id: -1
      }).then(result => {
        BrooksBondsRate.countDocuments(function(err, c) {
          if (err) {
            return res.status(400).send(err.message);
          } else {
            let returnData = {
              "count": c,
              "data": result,
            };
            res.send(returnData);
          }
        });
      }).catch(err => {
        res.status(500).send({
          "Status": false,
          "ResultCode": 103,
          "ReturnMessage": err.message || "Some error occurred while Saving  Trip Data"
        });
      });
    }catch(err){
      res.status(500).send({
        "Status": false,
        "ResultCode": 103,
        "ReturnMessage": err.message || "Technical error occured"
      });
    }
    }

 exports.setBrooksBondsRateList = (req, res) => {
      try{
        BrooksBondsRate.find().sort({
          _id: -1
        }).then(result => {
          BrooksBondsRate.countDocuments(function(err, c) {
            if (err) {
              return res.status(400).send(err.message);
            } else {
              let returnData = {
                "count": c,
                "data": result,
              };
              res.send(returnData);
            }
          });
        }).catch(err => {
          res.status(500).send({
            "Status": false,
            "ResultCode": 103,
            "ReturnMessage": err.message || "Some error occurred while Saving  Trip Data"
          });
        });
      }catch(err){
        res.status(500).send({
          "Status": false,
          "ResultCode": 103,
          "ReturnMessage": err.message || "Technical error occured"
        });
      }
      }