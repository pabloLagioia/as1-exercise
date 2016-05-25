var InspectionOrder = require("../models/InspectionOrder");
var validation = require("./validation");

exports.save = function (req, res, next) {
 
    var order = req.body;
 
    errors = validation.validateOrder(req);    
    if (errors) {
        return res.status(500).send(errors);
    };
    
    if ( !req.params.orderNumber ) {
        order["id"] = Date.now();
        order["orderNumber"] = order.id;
    }
    
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