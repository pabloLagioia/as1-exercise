var InspectionOrder = require("../models/InspectionOrder");
var validation = require("./validation");

exports.save = function (req, res, next) {
 
    req.body["id"] = Date.now();
    req.body["orderNumber"] = req.body["id"];
    
    errors = validation.validateOrder(req);    
    if (errors) {
        return res.status(500).send(errors);
    };
    
    InspectionOrder.findOneAndUpdate(
        { "orderNumber":req.params.orderNumber},
        req.body,
        {   
            upsert:true,
            new: true
        },
        function(err, doc) {
            if(err) {                   
                res.status(500).send(err);
            } else {
                res.status(200).send(doc);
            }
        });
};

exports.update = function (req, res, next) {
     
    InspectionOrder.findOneAndUpdate(
        { "orderNumber":req.params.orderNumber},
        req.body,
        {   
            new: true
        },
        function(err, doc) {
            if(err) {                   
                res.status(500).send(err);
            } else {
                res.status(200).send(doc);
            }
        });
};

exports.get = function (req, res, next) {
    
    var query = {};
    
    if( req.params.orderNumber ) {
        query = {
            orderNumber:req.params.orderNumber
        }
    }
    InspectionOrder.find(query, function(err, results) {
        res.status(200).send({
            "type": "inspectionOrder",
            "count": results.length,
            "items": results
        });
    });
};