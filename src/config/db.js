const mongoose = require("mongoose");
const keys = require("./keys");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(keys.mongoDBURL);
        console.log(`Connected to MongoDB on ${connection.connection.db.databaseName}`);
    }catch (e) {
        console.log(`Error connecting to MongoDB: ${e.message}`);
    }
}

module.exports = {connectDB};