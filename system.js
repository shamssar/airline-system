'use strict';
const events = require('./src/events');
require('./src/manger');
require('./src/pilot');


events.on('new-flight', newFlight);
function newFlight(payload){
  console.log(payload) ; 
}

events.on('took-off', tookOffFlight);
function tookOffFlight(payload){
    console.log(payload) ; 
}

events.on('arrived', flightArrived);
function flightArrived(payload){
console.log(payload) ;   
}