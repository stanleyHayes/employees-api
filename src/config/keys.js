const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    mongoDBURL: process.env.MONGODB_URI,
    nodeENV: process.env.NODE_ENV,
    port: process.env.PORT || 8000
}