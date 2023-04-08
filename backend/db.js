const mongoose = require('mongoose')
// shubham DfsG40UNGQxwQr85

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(`mongodb+srv://shubham:DfsG40UNGQxwQr85@cluster0.20ix0ft.mongodb.net/?retryWrites=true&w=majority`,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`successfully connected to mongoDB`);
    }
    catch(error){
        console.log(`error: ${error.message}`);
        process.exit();
    }
}

module.exports = connectDB;