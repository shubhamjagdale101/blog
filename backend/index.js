const express = require('express');
const connectDB = require("./db");
const userRoutes = require("./Routes/userRoutes");
const blogRoutes = require("./Routes/blogRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleWare");

const app = express();
connectDB();
app.use(express.json());

app.listen(5000,console.log("welcome"));

app.use("/user",userRoutes);
app.use("/blog",blogRoutes);

app.use(notFound);
app.use(errorHandler);