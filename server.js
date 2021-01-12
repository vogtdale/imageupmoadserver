'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const path = require('path')
const fs = require("fs");
const rimraf = require('rimraf')
const cors        = require('cors');
require('dotenv').config();
require("./db-connections")


const apiRoutes = require('./routes/api.js');

let app = express();


app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors()); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname+'public/uploads/'))

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.send("server up and running");
  });


//Routing for API 
apiRoutes(app);  

    
//404 Not Found Middleware
app.use(function(req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
  });


  
  /**************************************
  *  
  *       REMOVE FILES IN DIRECTORY
  *    
  ***************************************/
  // const uploadsDir = __dirname + '/public/uploads'
  
  // fs.readdir(uploadsDir, (err, files) => {
  //   files.forEach((file, index) => {
  //     fs.stat(path.join(uploadsDir, file), (err, stat) => {
  //       let endTime, now;
  //       if(err) {
  //         return console.error(err)
  //       }
  //       now = new Date().getTime()
  //       endTime = new Date(stat.ctime).getTime() + 15000
  //       if (now > endTime) {
  //         return rimraf(path.join(uploadsDir, file), (err) => {
  //           if (err) {
  //             return console.error(err)
  //           }
  //           console.log("successfully deleted")
  //         })
  //       }
  //     })
  //   })
  // })


//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});