const mongoose = require ("mongoose");

require('dotenv').config();

// process object ni andar data ayi jase env file mathi
const connect = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then(()=> console.log("DB connection successful"))
    .catch((error)=> {
        console.log("issue in DB Connection");
        console.error(error.message);
        process.exit(1);
    });
}

module.exports = connect;