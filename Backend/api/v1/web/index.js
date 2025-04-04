
const { Router } = require("express");
const app = Router();

const user = require("./user");
const events = require("./event");

/*********** Combine all Routes ********************/

app.use("/user", user);
app.use("/event", events);

module.exports = app;
