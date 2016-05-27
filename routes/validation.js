exports.validateOrder = function (req, res, next) {
       
    req.checkBody('id', 'Invalid ID').notEmpty().isInt();
    req.checkBody('orderNumber', 'Invalid order number').notEmpty().isInt();
    req.checkBody('vehicle.year', 'Invalid year').notEmpty().isInt();
    req.checkBody('vehicle.model', 'Invalid model').notEmpty().isAlpha();
    req.checkBody('vehicle.make', 'Invalid make').notEmpty().isAlpha();

    return req.validationErrors();
}