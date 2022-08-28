const EmpDetailsTable = require("../../models/Employee/EmpDetails.model.js");
const Joi = require("joi");
const helpers = require("../../controller/helpers/ErrorHelper");
const CONSTANTS = require("../../config/constants.js");
const fileName = __filename.split(/[\\/]/).pop();
var datetime = require('node-datetime');
var formattedDate = datetime.create().format('Y/m/d H:M:S');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { validateGetEmpDetailsSchema , validateSaveEmpDetails ,validateUpdateEmpDetails } = require('../../validators/EmpDetails.js');



exports.saveEmpDetails = ( req , res ) => {
  var salt = bcrypt.genSaltSync(10);
  var { error } = validateSaveEmpDetails ( req.body );
  if( error ) {   
     res.status(400).json({ 
        "status"   : false,
        "message" : "Invalid Request",
        "error" : error.message
    });
  } else{
    try {
        const query = {
            "name" : req.body.name,
            "phone" : req.body.phone,
            "email" : req.body.email,
            "country"  : req.body.country,
            "password"  : bcrypt.hashSync(req.body.password , salt)
        }
        EmpDetailsTable.find({"email" : req.body.email}, {_id : 0}).then( (result) => {   
           if( result.length > 0 ) {   
            res.status(409).json({
                "status" : true,
                "message" : "Email Already Exists"
            })
           }else{
            const empInfo = new EmpDetailsTable( query );
            empInfo.save().then( (result) => { 
               if (result ) { 
                res.status(201).json({  
                    status  : true, 
                    "message" : "Employee Details Saved",
                    "data" : result
                })
               } else {
                res.status(500).json({  
                    status  : false, 
                    "message" : "Employee Details Not Saved"
                })
               }
            }).catch( (err) => { 
                helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
                res.status(500).json({ 
                    status : false, 
                    message : err.message
                  }); 
            });
           }
        }).catch( (err) => {   
            helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
            res.status(500).json({ 
                status : false, 
                message : err.message
              }); 
        }); 
    } catch (err) {
        helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
        res.status(500).json({ 
            status : false, 
            message : err.message
          }); 
    }
  }
}



exports.getEmpDetails = (req, res) => { 

 var { error } = validateGetEmpDetailsSchema ( req.body );
  if( error ) {
  res.status(401).json({
    "status" : false, 
    "message" : "Invalid request",
    "error" : error.message
  })
  }else{
    try {
        var query = {};
        if(req.body.name){
        query.name = req.body.name
        }
        if(req.body.phone){
            query.phone = req.body.phone
        }
        if(req.body.email){
            query.email = req.body.email
        }
        if(req.body.country){
            query.country = req.body.country
        }
        if(req.body.fromdate){
          query.fromdate = req.body.fromdate
        }
        
         EmpDetailsTable.aggregate([
          { $match : query },
          { 
            $lookup : 
            {
            from : "dummy_empdesignationschemas",
            localField : "designation_id",
            foreignField : "designation_id",
            as : "designationDetails"
            }
          }, 
          {
            $unwind : 
            { 
              path : "$designationDetails"
            }
          },
          {
            $project : {
                _id : 0,
                emp_id : 1,
                name : 1,
                designation_name : "$designationDetails.designation_name",
                designation_id : "$designationDetails.designation_id"
                }     
          },
          { 
            $skip : req.body.offset 
          },
          {
            $limit : req.body.limit 
          },
          {
            $sort : {
            _id : -1
            }
          }
        ]).then( (result) => {
            EmpDetailsTable.countDocuments(query, function (err, count) {
                if(err){
                res.status(400).send(err.message);
                }
                else{
                res.status(200).json({
                    "status" : "success",
                    "data" : result,
                    "count" : count
                })  
                }
            });
        }).catch( (err) => {    
           helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
           res.status(500).json({ 
            status : false, 
            message : err.message
          }); 
        })
    } catch (err) {
    helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
    res.status(500).json({ 
        status : false, 
        message : err.message
      });   
    }
  }
};



exports.updateEmpDetails = ( req , res) => {
 
 var { error } = validateUpdateEmpDetails ( req.body );
 if( error ) { 
  res.status(401).json({
    "status" : false, 
    "message" : "Invalid request",
    "error" : error.message
  })
 }else{
        try {
          const data = {
            id : req.body.id,
            name : req.body.name,
            phone : req.body.phone,
            country : req.body.country,
            createdat : req.body.createdat,
            designation_id : req.body.designation_id,
            updatedat : formattedDate,
          }
          
           EmpDetailsTable.findOneAndUpdate({
            emp_id : req.body.id
          },data,{
            new : true
          }).then((result) => {
             if(result){
              res.status(200).json({
              "status" : true,
              "message" : "Data Updated Successfully",
              "data" : result
              })
            }else{
              res.status(404).json({
                "status" : false,
                "message" : "Data Not Found"
              })
            }
          }).catch( (err) => {  
            helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
            res.status(500).json({ 
                status : false, 
                message : err.message
              });  
          })
        } catch (err) {
          helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
          res.status(500).json({ 
              status : false, 
              message : err.message
            });  
        }
 }
}

exports.checkLogin = (req, res) => {
  const { email, password } = req.body;
  const schema = Joi.object().keys({
    email : Joi.string().required(),
    password : Joi.string().required(),
  })
  var { error } = schema.validate ( req.body );
   if( error ) {
    res.status(400).json({
      "status" : false,
      "message" : "Invalid Request",
      "error" : error.message
    })
   }else{
    try {
      EmpDetailsTable.findOne({ email: email}).then(result => {
        if (result) {
           bcrypt.compare(password, result.password).then( user => {
          if (user) {
            var params = {  email: result.email };
            jwt.sign(params ,  CONSTANTS.jwtKeys.SECRET_KEY , { expiresIn : "1h" });
          }else{
            res.status(404).json({
              "status" : false,
              "message" : "Wrong Password",
            });
          }
          }).catch( (err) => {
          helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
          res.status(500).json({ 
              status : false, 
              message : err.message
            });     
          });
        } else {
          res.status(404).json({
            "status" : false,
            "message" : "User Dosn't Exist",
          });
        }
      }).catch( (err) => {
      helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
          res.status(500).json({ 
              status : false, 
              message : err.message
            });    
           })
    } catch (error) {
    helpers.getErrorDetails( err.name , req.body , fileName , req.path , err.message );
          res.status(500).json({ 
              status : false, 
              message : err.message
            });
      
    }
   }
}


