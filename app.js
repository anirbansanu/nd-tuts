const express = require('express'); //Import the express dependency
require('dotenv/config'); 
const db = require("./models/db");
const routes = require('./routes/route.js'); 


const User = require('./models/user');

const { FORCE } = require('sequelize/lib/index-hints');


const app = express();              //Instantiate an express app, the main work horse of this server
const PORT = process.env.PORT;   
app.use(express.json());          
// Routes will be written here 
app.use('/admin', routes);  
//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {                            //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

db.sync().then(() => {
    console.log("db synced");
  });

app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error); 
    } 
);
