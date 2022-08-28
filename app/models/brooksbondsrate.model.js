const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
const  brooksBondsRateSchema = mongoose.Schema(
    {
      LineHaulRateId:Number,
      PreferWeightType:String,
      ServiceType:String,
      HubID:Number,
      HubName:String,
      ConnectionID :Number,
      ConnectionName:String,
      RouteMode :String,
      ColoaderID :Number,
      ColoaderName:String,
      Rate :Number,
      Comments :String,
      EffectiveDate :Date,
      CreatedBy :String,
      CreatedDate :Date,
      LastModifiedBy :String,
      LastModifiedDate :Date,
   },
   {
      timestamps: true
   });

   brooksBondsRateSchema.plugin(AutoIncrement, {
      id:'brooksBondsRateSchema_seq',
      inc_field: 'LineHaulRateId'
});

module.exports = mongoose.model('brooksbondsratemasters', brooksBondsRateSchema);
