const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
require("dotenv").config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB Connection Successfull!"))
	.catch((err) => {
		console.log(err);
	});

console.log(`This is process.env.NODE_ENV`);
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
//cors not needed because express is serving react
// app.use(cors({ origin: "http://justdoit.anhonestobserver.com" })); //for production.
app.use(cors()); //for development
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
	console.log("Backend server is running on port: " + process.env.PORT);
});
