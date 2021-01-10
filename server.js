const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
require('dotenv').config();
require("./db-connections")

const apiRoutes = require('./routes/api.js');

let app = express();


app.use(cors()); 



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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


//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});