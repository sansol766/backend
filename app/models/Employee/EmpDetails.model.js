const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
const EmpDetailsSchema = mongoose.Schema(
    {
        emp_id : Number,
        name : String,
        phone : Number,
        password : String,
        email : String,
        designation_id : Number,
        country : String,
        createdat : String,
        createdby : String,
        updatedat : String,
        updatedby : String,
    }
);
EmpDetailsSchema.plugin(AutoIncrement, {
   id : 'EmpDetailsSchema_seq',
   inc_field : 'emp_id',
});

module.exports = mongoose.model('dummy_EmpDetailsSchema', EmpDetailsSchema); 