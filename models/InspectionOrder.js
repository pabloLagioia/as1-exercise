var mongoose = require('mongoose');

var inspectionOrderSchema = new mongoose.Schema({
  id : Number,
  orderNumber : String,
  note : String,
  inspectionType : String,
  closed : {type: Boolean, default: false},
  vehicle : {
    year: Number,
    make: String,
    model: String
  }
});

module.exports = mongoose.model('InspectionOrder', inspectionOrderSchema);
