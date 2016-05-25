var inspectionTypes = require("../inspectionTypes.json");

exports.get = function (req, res, next) {
    
    res.status(200).send(
        {
            type: "inspectionTypes",
            count: inspectionTypes.length,
            items: inspectionTypes
        }
    );

};