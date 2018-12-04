//mmodels and config
var events          = require('events'),
    express         = reuire('express'),
    myRest          = require('./myRest/myRest.js'),
    eventsConfig    = require('./myRest/config').events;
//
//server  
var app     = express();
var port    = process.env.PORT || 3000;
//
//my event emitter
var ransDiner = new myRest();
//
//
//'MAIN'
//newOrder(), orderFinish(), removeAll()
app.get('/', (req, res) =>{
    //waiter inputs order from table 1
    ransDiner.newOrder(1, "Banana Pancake"); 
    ransDiner.newOrder(1, "Banan Pancake"); 
    ransDiner.newOrder(1, "Banan Pancake"); 
    ransDiner.newOrder(1, "Banan Pancake"); 
    ransDiner.newOrder(1, "Banan Pancake"); 
    ransDiner.newOrder(1, "Banan Pancake"); 
});
//
//port
app.listen(port, () =>{
    console.log(`listening to port: ${port}`);
});
//
//assign methods to event:
// OUT:"orderReady"     -  takeDish();
// EMP:"noOrders"       -  kitchenBreak(); 
// SHOW:"printOrders"   -  printAll();
ransDiner
            .on(eventsConfig.orderReady, ransDiner.takeDish())
            .on(eventsConfig.noOrders, ransDiner.kitchenBreak())
            .on(eventsConfig.printOrders, ransDiner.printAll());