'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const ioServer = require('socket.io')(PORT);

//namespace
const airline = ioServer.of('/airline');
airline.on('connection', (socket) => {
  
    socket.on('took-of', (payload) => {
      let Flight=payload.Flight;
      console.log( "Flight ", Flight);
    });
});

ioServer.on('connection', (socket) => {
  socket.on('new-flight', (payload) => {
    let Flight=payload.Flight;
    console.log( "Flight ", Flight);
    airline.emit('new-flight',payload);
    ioServer.emit('new-flight',payload);
});

socket.on('arrived', (payload) => {
    let Flight=payload.Flight;
    console.log( "Flight ", Flight);
    ioServer.emit('arrived',payload);
});
});


