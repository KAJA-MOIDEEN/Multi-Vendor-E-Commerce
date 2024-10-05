const mongoose = require("mongoose");

const connectionDB = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((data)=>{
        console.log(`mongodb Connected with server: ${data.connection.host}`)
    });
}
module.exports = connectionDB;