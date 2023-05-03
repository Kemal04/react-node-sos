const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

const cors = require("cors");
const sequelize = require('./data/db');

app.use(express.json());
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors());
app.use('/', express.static('public'))


const AuthRouter = require("./routes/auth.router")
const WelayatRouter = require("./routes/welayat.router")
const DisasterRouter = require("./routes/disaster.router")
const SOSRouter = require("./routes/sos.router")
const SOSSubmitRouter = require("./routes/sosSubmit.router")
const UserRouter = require("./routes/user.router")
const ContactRouter = require("./routes/contact.router")
const UnitRouter = require("./routes/unit.router")
const NotificationRouter = require("./routes/notification.router")
const InstructionRouter = require("./routes/instruction.router")
const VitnessRouter = require("./routes/sosVitness.router")

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/welayat", WelayatRouter);
app.use("/api/v1/disaster", DisasterRouter);
app.use("/api/v1/sos", SOSRouter);
app.use("/api/v1/sossubmit", SOSSubmitRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/unit", UnitRouter);
app.use("/api/v1/notification", NotificationRouter);
app.use("/api/v1/instruction", InstructionRouter);
app.use("/api/v1/vitness", VitnessRouter);


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})