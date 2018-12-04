module.exports = {
    events: {
        OUT:"orderReady",
        EMP:"noOrders",
        SHOW:"printOrders"
    }
}
// OUT:"orderReady"     -  takeDish();
// EMP:"noOrders"       -  kitchenBreak(); 
// SHOW:"printOrders"   -  printAll();