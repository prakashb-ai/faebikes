const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const vehicle =  require('./router_vehicles')
const user = require('./router_user');
const dotenv = require('dotenv');

dotenv.config();


app.use("/upload/image",express.static(__dirname+"/upload/image"))
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
//app.use(user);
app.use(vehicle);



mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('database is connected');
}).catch((err)=>{
    console.log(err);
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})