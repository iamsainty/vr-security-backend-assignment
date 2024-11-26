const express = require("express");
const dbConnect = require("./dbConnect");

const app = express();

app.use(express.json());

dbConnect();


// route for authentication works like register and login
app.use("/auth", require("./routes/authRoutes"));

// route for fetching user data with validation of correct user type/role
app.use('/get-details', require('./routes/getDetails'));

app.use("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
