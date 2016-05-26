var mongoose = require('mongoose');

var inspectionOrderSchema = new mongoose.Schema({
  id: Number,
  orderNumber:    { type:String, index: { unique: true } },
  note:           { type:String },
  inspectionType: { type:String },
  closed:         { type: Boolean, default: false },
  vehicle: {
    year:  { type:Number },
    make:  { type:String },
    model: { type:String }
  }
});

module.exports = mongoose.model('InspectionOrder', inspectionOrderSchema);
