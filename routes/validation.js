/**
  * id : number (mandatory)
  * note : string
  * orderNumber : string (can use id here) (mandatory)
  * inspectionType : string (mandatory)
  * vehicle : Vehicle (mandatory)
  * closed : boolean (default value is false)
  */

exports.validateOrder = function (req) {
    
    var isRequired = req.method === "PUT";
    
    req.assert({
        "id": {
            optional: isRequired,
            notEmpty: {
                errorMessage: "Id is mandatory"
            }
        },
        "orderNumber": {
            optional: isRequired,
            notEmpty: {
                errorMessage: "Order number is mandatory"
            }
        },
        "vehicle": {
            optional: isRequired,
            notEmpty: {
                errorMessage: "vehicle number is mandatory"
            }
        }
    })
    
    return req.validationErrors();
}