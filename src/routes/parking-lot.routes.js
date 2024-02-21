const controller = require("../controllers/parking-lot.controller");
const app = require("express")();

// parking lot crud
app.post("/", controller.create);
app.post("/", controller.delete);

app.post("/entry/", controller.entry);
app.post("/exit/", controller.exit);

module.exports = app;
