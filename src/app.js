const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

const {connectDB} = require("./config/db");

dotenv.config();

connectDB();

const employeeV1Routes = require("./routes/v1/employees");
const rankV1Routes = require("./routes/v1/ranks");
const roleV1Routes = require("./routes/v1/roles");
const departmentV1Routes = require("./routes/v1/departments");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


app.use('/api/v1/employees', employeeV1Routes);
app.use('/api/v1/ranks', rankV1Routes);
app.use('/api/v1/roles', roleV1Routes);
app.use('/api/v1/departments', departmentV1Routes);

module.exports = app;