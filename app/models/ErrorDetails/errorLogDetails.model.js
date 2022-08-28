const mongoose = require('mongoose');

const dummyErrorDetailSchema = mongoose.Schema({
    errorname: String,
    apiname: String,
    filename: String,
    payload: JSON,
    errordescription : String,
},
 {
    timestamp : true
 }
);

module.exports = mongoose.model('dummy_errorlog',dummyErrorDetailSchema);