'use strict';
require('dotenv').config();
const io = require('socket.io-client');
const { faker } =require('@faker-js/faker');
let host = `http://localhost:${process.env.PORT}/`;

const systemConnection = io.connect(host);


systemConnection.on('arrived', payload=>{
    console.log(`Manager:we're greatly thankful for the amazing flight, ${payload.Details.pilot}`);
});

setInterval(()=>{
    let Flight={
        event:'new-flight',
        time:faker.date.future(),
        Details:{
            airLine:'Royal Jordanian Airlines',
            flightID:faker.datatype.uuid(),
            pilot:`${faker.name.firstName()} ${faker.name.lastName()}`,
            destination:`${faker.address.city()}, ${faker.address.country()}`    
        }
    };
    console.log(`Manager: new flight with ID '${Flight.Details.flightID}' have been scheduled`);
    let payload = {Flight:Flight,Details:Flight.Details};
    systemConnection.emit('new-flight',payload);

},10000)