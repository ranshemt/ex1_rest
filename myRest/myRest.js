var events          = require('events'),
    eventsConfig    = require('./config');

var msgStr;
//for kitchen- count how many oders left to make
class myRest extends events.EventEmitter{
    constructor(){
        super();    
        this.orders = [];
        this.myConsole = [];
        this.lastTbID = -1;
    }
    //
    //add order (by waiter)
    newOrder(forTable){
        for(let i = 1; i < arguments.length; i++){
            this.orders.push(
                {"desc":arguments[i], "tableID":forTable}
            );
        }
        this.emit('printOrders');   //printAll();
    }
    //remove order (by kitchen staff)
    orderFinish(forTable){
        var flag = false;
        var nRemove = 0, fromI = -1;
        for(let i=0; i<this.orders.length; i++){
            if(flag == true){
                if(this.orders[i].tableID != forTable)
                    break;
            }
            if(this.orders[i].tableID == forTable){
                flag = true;
                if(fromI == -1)     fromI = i;
                nRemove++;
            }
        }
        this.orders.splice(fromI, nRemove);
        this.lastTbID =  forTable;
        this.emit('orderReady');
        
        // for(let i = 0; i < this.orders.length; i++){
        //     if(this.orders[i].tableID == forTable){
        //         this.lastTbID = this.orders[i].tableID;
        //         this.emit('orderReady');
        //         this.orders.splice(i, 1);
        //         break;
        //     }
        // }
        if(this.orders.length == 0){
            this.emit('noOrders');  //kitchenBreak();
        } else{
            this.emit('printOrders');   //printAll();
        }
    }
    //getAll
    printAll(){
        for(let i = this.orders.length-1; i >= 0; i--){
            msgStr = `${i}. For table: ${this.orders[i].tableID} Dish: ${this.orders[i].desc}`;
            console.log(msgStr);
            this.myConsole.push(msgStr);
        }
        if(this.orders.length == 0){
            msgStr = "no orders...";
            console.log(msgStr);
            this.myConsole.push(msgStr);    
        }
        msgStr = "--------";
        console.log(msgStr);
        this.myConsole.push(msgStr);
    }
    //reset
    removeAll(){
        this.orders.length = 0;
        this.isBreak = true;
        this.emit('noOrders');  //kitchenBreak()
    }
    //no orders to make
    kitchenBreak(){
        msgStr = "finished making all orders, take break!";
        console.log(msgStr);
        this.myConsole.push(msgStr);
        msgStr = "--------";
        console.log(msgStr);
        this.myConsole.push(msgStr);
    }
    takeDish(){
        msgStr = `order for table ${this.lastTbID} is ready, take it!`;
        console.log(msgStr);
        this.myConsole.push(msgStr);
        msgStr = "--------";
        console.log(msgStr);
        this.myConsole.push(msgStr);
    }
    // OUT:"orderReady"     -  takeDish();
    // EMP:"noOrders"       -  kitchenBreak(); 
    // SHOW:"printOrders"   -  printAll();
}

module.exports = myRest;