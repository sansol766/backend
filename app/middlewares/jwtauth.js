var jwt = require('jsonwebtoken');
var CONSTANTS = require('../config/constants.js');
const fileName = __filename.split(/[\\/]/).pop();
const helpers = require('../controller/helpers/ErrorHelper.js');

exports.verifyAuthKey = (req,res) => {
        var token = req.headers.authorization;
       jwt.verify(token, CONSTANTS.jwtKeys.SECRET_KEY ,function (err,decode){
       if(err) {
        res.status(400).json({
          "status" : false,
          "message" : "Please Provide Valid Token",
          "data" : token
        });
       }else if(decode){
        res.status(200).json({
          "status" : true,
          "message" : "User Authenticated"
        });
       }
       }).catch(err => {
        helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
          res.status(500).json({ 
              status : false, 
              message : err.message
            });
       });
    
}