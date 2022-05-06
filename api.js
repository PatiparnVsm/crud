const dboperation = require('./dboperation');
var Db = require('./dboperation');
var Order = require('./order');

var express  = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { route } = require('express/lib/application');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router)

router.use((request,response,next) => {
    console.log('middleware');
    next();
})

router.route('/orders').get((request,response) => {
    dboperation.getOrders().then(result => {
        response.json(result)
    })
})

router.route('/order/:id').get((request,response) => {
    dboperation.getOrder(request.params.id).then(result => {
        response.json(result)
    })
})
router.route('/order').get((request,response) => {
    dboperation.getOrder(request.query.id).then(result => {
        response.json(result)
    })
})

router.route('/order').post((request,response) => {
    let order = {...request.body}
    dboperation.addOrder(order).then(result => {
        console.log(result)
        response.json(result)
    })
})
var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is running at ' + port);

