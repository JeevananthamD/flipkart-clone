const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");
const PORT = process.env.PORT || 3000;

//routes
const userRoutes = require("./routes/user");

//mongodb connection
mongoose.connect("mongodb://localhost/flipkart-clone", {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("Database Connected"))
.catch((err) => console.log("Database not conneted", err));

//middlewares
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api/admin", userRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});