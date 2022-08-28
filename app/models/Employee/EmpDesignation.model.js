const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const EmpDesignationSchema = mongoose.Schema(
    {
        emp_id : Number,
        designation_id : Number,
        designation_name : String,
    },{
        timestamps : true,
    });
    EmpDesignationSchema.plugin(AutoIncrement,{
        id : 'EmpDesignationSchema_seq',
        inc_field : 'designation_id',
    })
module.exports = mongoose.model('dummy_EmpDesignationSchema', EmpDesignationSchema);