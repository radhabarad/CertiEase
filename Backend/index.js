const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
const serveStatic = require('serve-static');

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 5000;  //either this or this

//start the server
app.listen(PORT, ()=>{
    console.log(`server started successfully at ${PORT}`);
})

//middlewear to parse json request body
app.use(express.json());

const user = require("./routes/user");

//mount (versioning) the todo routes

app.use("/api/v1",user);

//database connection 
const dbConnect = require("./config/database");
dbConnect();

//default route 
app.get("/",(req,res)=>{
    res.send(`<h1>This is HOMEPAGE</h1>`)
})

// Mount the middleware function before serving static files
app.use('/images', serveStatic(__dirname + '/images'));

app.use(express.static('public'));

