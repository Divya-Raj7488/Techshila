require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = require("./config/cors");
const cors = require("cors");
const DbConfig = require("./config/dbConfig");
const cookieParser = require("cookie-parser");

DbConfig();
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use("/user", require("./routes/userRoutes"));
app.use("/order", require("./routes/orderRoutes"));
app.use("/inventary", require("./routes/inventary"));
// app.use("/stocks", require("./routes/stockRoutes"));
app.use("/suppliers", require("./routes/supplierRoutes"));
app.use("/medicines", require("./routes/medicineRoutes"));

app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});
mongoose.connection.on("open", () => {
	console.log("connection open");
});
