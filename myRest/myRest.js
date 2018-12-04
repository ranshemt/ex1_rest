var events          = require('events'),
    eventsConfig    = require('./myRest/config');

//for kitchen- count how many oders left to make
class myRest extends events.EventEmitter{
    constructor(){
        super();
        this.ordersTotal = 0;
        this.orders = [];
        this.rdyDish = -1;
    }
    //
    //add order (by waiter)
    newOrder(forTable, desc){
        this.ordersTotal++;
        this.orders.push(
            {"desc":desc, "tableID":forTable}
        );
        this.emit('printOrders');   //printAll();
    }
    //remove order (by kitchen staff)
    orderFinish(forTable){
        for(let i = 0; i < this.orders.length; i++){
            if(orders[i].tableID == forTable){
                this.rdyDish = i;
                this.emit('orderReady');
                this.orders.splice(i, 1);
                break;
            }
        }
        if(orders == 0){
            this.emit('noOrders');  //kitchenBreak();
        } else{
            this.emit('printOrders');   //printAll();
        }
    }
    //getAll
    printAll(){
        for(let i = this.orders.length-1; i >= 0; i--)
            console.log(`${i}. For table: ${this.orders[i].tableID} Dish: ${this.orders[i].desc}`);
    }
    //reset
    removeAll(){
        this.orders.length = 0;
        this.isBreak = true;
        this.emit('noOrders');  //kitchenBreak()
    }
    //no orders to make
    kitchenBreak(){
        console.log("finished making all orders, take break!");
    }
    takeDish(){
        console.log(`dish for table: ${this.orders[this.rdyDish].tableID} is ready!`);
    }
    // OUT:"orderReady"     -  takeDish();
    // EMP:"noOrders"       -  kitchenBreak(); 
    // SHOW:"printOrders"   -  printAll();
}