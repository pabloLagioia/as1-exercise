var orders = require('./routes/Orders');
types = require('./routes/Types'),
mongoose = require('mongoose'),
express = require('express'),
bodyParser = require('body-parser'),
expressValidator = require('express-validator'),
app = express(),
router = express.Router();

app.use(bodyParser.json())
app.use(expressValidator());

app.use(express.static('public'));

router.route('/orders')
.get(orders.get)
.post(orders.save);

router.route('/orders/:orderNumber')
.get(orders.get)
.put(orders.update);

router.route('/inspectionTypes/')
.get(types.get);

app.use('/api', router);

/*
 * MongoDB
 */
require('./models/InspectionOrder');
mongoose.connect("mongodb://localhost:27017/as1-test");
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error');
  process.exit(1);
});

/*
 * Start Server
 */
var server = app.listen(8081, function () {
  console.log("Server started port 8081");
});