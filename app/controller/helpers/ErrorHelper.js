const errorLogs =   require('../../models/ErrorDetails/errorLogDetails.model.js');
const logger = require('../../lib/logger.js');
var datetime = require('node-datetime');
var formattedDate = datetime.create().format('Y/m/d H:M:S');;


exports.getErrorDetails = ( errorname , payload , filename , apiname , errordescription ) => {
 return new Promise( (resolve, reject) => { 
    const query = 
    { errorname :  errorname, 
      payload : payload, 
      filename : filename, 
      apiname : apiname, 
      errordescription : errordescription
    };
    callToLogFile(errorname , payload , filename , apiname , errordescription );
    const saveErrors = new errorLogs( query );
    return saveErrors.save(query).then( () => {  
        resolve("great");
    }).catch( err => {
        reject(err);
    });   
});
}

function callToLogFile( errorname , payload , filename , apiname , errordescription ) {
  logger.info(`level : info, datetime : ${formattedDate}, errorname : ${errorname}, payload : ${payload}, filename : ${filename}, apiname : ${apiname}, errordescription : ${errordescription}`);
}