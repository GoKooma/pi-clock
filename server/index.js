const express = require('express');
const stoppable = require('stoppable');
// const cors = require('cors');
const morgan = require('morgan');
const path = require('path')
const router = require('./router')
require('dotenv').config()

const initializeExpress = () => {
  const app = express();
  const server = stoppable(require('http').Server(app));
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  } else {
    app.use(morgan('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}', 
    { stream: winston.stream }));
  }

  app.use(express.static(path.resolve(__dirname, '../public')));
  app.use('/api', router)

  /******    Graceful Shutdown    ******/
  // quit properly on user action
  process.on('SIGINT', function onSigint () {
    console.info('\nSIGINT - Interuption signal detected. Graceful shutdown ', new Date().toISOString());
    shutdown();
  });
  
  // quit properly on docker stop or K8s term
  process.on('SIGTERM', function onSigterm () {
    console.info('SIGTERM - Termination signal detected. Graceful shutdown ', new Date().toISOString());
    shutdown();
  })
  
  // shut down server
  const shutdown = () => {
    console.info('starting stoppable');
    server.stop(); // this might take a while depending on connections
    console.info('exiting');
    process.exit();
  }
  
  /******    Listen to port    ******/
  server.listen(PORT, function () {
    let port = server.address().port;
    console.log('Pi Clock is Live. Listening to port ' + PORT);
  });
}

const initializeApp = () => {
  console.log('\nStarting Pi Clock server!\n');
  initializeExpress()
}

initializeApp()