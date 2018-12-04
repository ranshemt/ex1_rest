//mmodels and config
var events          = require('events'),
    express         = require('express'),
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
    console.log("start");
    //waiter inputs order from table 1
    ransDiner.newOrder(1, "Banana Pancake", "Coke");
    ransDiner.newOrder(1, "Steak", "Salad", "Red Wine");
    //waiter inputs order from table 2
    ransDiner.newOrder(2, "Chocolate Pancake", "Diet Coke");
    //table 1 order ready
    ransDiner.orderFinish(1);
    //table 2 want more food
    ransDiner.newOrder(2, "Milkshake");
    //table 2 ready
    ransDiner.orderFinish(2);
    //add 3 more tables
    ransDiner.newOrder(3, "Hamburger", "Chips", "Coke Zero");
    ransDiner.newOrder(7, "Ice Cream", "Cake");
    ransDiner.newOrder(3, "Hamburger King Size", "Chips Big", "Coke");
    ransDiner.newOrder(11, "Regular Pancake", "Water", "Water");
    ransDiner.newOrder(7, "Waffle", "Milkshake", "Fruit Salad");
    //first order of table 7 is ready
    ransDiner.orderFinish(7);
    ransDiner.newOrder(7, "Family Combination", "Water", "Water", "Water", "Water");
    //closing diner suddenly due to health inspection,
    //cancel all open orders
    ransDiner.removeAll();
    //call printAll() just to verify removeAll() worked
    ransDiner.printAll();
    //send json response
    res.send(JSON.stringify(ransDiner.myConsole));
    ransDiner.myConsole.length = 0;
    //
    //
    res.end();
    console.log("end");
});
//
//port
app.listen(port,
    () => {
    console.log(`listening to port: ${port}`);
});
//
//assign methods to event:
// OUT:"orderReady"     -  takeDish();
// EMP:"noOrders"       -  kitchenBreak(); 
// SHOW:"printOrders"   -  printAll();
ransDiner.on(eventsConfig.OUT, ransDiner.takeDish);
ransDiner.on(eventsConfig.EMP, ransDiner.kitchenBreak);
ransDiner.on(eventsConfig.SHOW, ransDiner.printAll);