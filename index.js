const app = require("./app");
const connectDB = require("./db/db");
const dotenv = require('dotenv').config();

port = 3000;

const start = async () =>{
    try{
        // console.log(process.env.MONGO_URI);
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
    );
    } catch(err){
        console.log(err);
    }
}


start();