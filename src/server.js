const express = require("express");
const cors = require("cors");

const app = express();

// routers
const parking_lot_router = require("./routes/parking-lot.routes");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/parking-lot/", parking_lot_router);

app.listen(4040, () => console.log("server started at port 4040"));
