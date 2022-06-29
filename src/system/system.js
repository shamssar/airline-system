'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const ioServer = require('socket.io')(PORT);

const queue = {
    flights: {

    }
}

//namespace
const airline = ioServer.of('/airline');

airline.on('connection', (socket) => {
    socket.on('took-off', (payload) => {
        let Flight=payload.Flight;
       // delete queue.flights[payload.Details.flightID];
        console.log( "Flight ", Flight);
        });
});



ioServer.on('connection', (socket) => {
    socket.on('new-flight', (payload) => {
        let Flight=payload.Flight;
        const id = payload.Details.flightID;
        queue.flights[id]=payload;
        console.log( "Flight ", Flight);
        airline.emit('new-flight',payload);
        ioServer.emit('new-flight',payload);
    });

    socket.on('arrived', (payload) => {
        let Flight=payload.Flight;
        console.log( "Flight ", Flight);
        ioServer.emit('arrived',payload);
    });

    socket.on('get-all',()=>{
        Object.keys(queue.flights).forEach((id)=>{
            socket.emit('flight',{id:id,
              payload:queue.flights[id]
            });
            delete queue.flights[id];
        })
    })
    socket.on('delete',(id)=>{
        delete queue.flights[id];
    })
});