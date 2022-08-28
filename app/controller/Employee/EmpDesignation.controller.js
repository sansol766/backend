const dummy_EmpDesignation = require('../../models/Employee/EmpDesignation.model.js');  
const helpers = require('../helpers/ErrorHelper.js');
const { validateGetDesignation , validateSaveDesignation} = require('../../validators/EmpDesignation.validators.js');
const fileName = __filename.split(/[\\/]/).pop();

exports.getDesignation = ( req , res ) => {
   var { error } = validateGetDesignation ( req.body );
   if( error ) {
      res.status(401).json({
        "status" : false, 
        "message" : "Invalid request",
        "error" : error.message
      })
      }else{
        try {
            
            dummy_EmpDesignation.find({}).skip(req.body.offset).limit(req.body.limit).then( (result) => {
               dummy_EmpDesignation.countDocuments(function (err, count) {
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
}

exports.saveDesignation = ( req , res ) => {

   const { error } =  validateSaveDesignation(req.body);  
   if (error) {
                return res.status(400).json({  
                  "status": false, 
                  "message": "Invalid Request", 
                  "data": error.message
               });      
   }else{
      try {
         var query = {
            "designation_name" : req.body.designation
         }
         
         dummy_EmpDesignation.find(query).then( dupRec => {
            if(dupRec.length > 0)
            {  
                     res.status(409).json({  
                        "status": true, 
                        "message": "Designation Already Exists"
                     })
            }else{
              const designationData = new dummy_EmpDesignation( query );
              designationData.save().then(data => {
               if(data){
                  res.status(201).json({
                     "status": true, 
                     "message": "Designation Added",
                     "data": data
                  })
               }else{
                  res.status(500).json({  
                     "status": false, 
                     "message": "Designation Not Added"
                  })
               }
              }).catch(err => { 
               helper.getErrorDetails( err.name , req.body , fileName , req.path , err.message ); 
              res.status(500).json({ 
               status : false, 
               message : err.message
             });   
            })
            }
         }).catch(err => { 
            res.status(500).json({ 
               status : false, 
               message : err.message
             });   
            helper.getErrorDetails( err.name , req.body , fileName , req.path , err.message ); 
         })
     }
     catch (err) { 
      res.status(500).json({ 
         status : false, 
         message : err.message
       });   
     helper.getErrorDetails( err.name , req.body , fileName , req.path , err.message ); 
     }
   }
   
}