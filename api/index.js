const express = require("express");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const mongoose = require("mongoose");
const verify = require("./routes/verifyToken");

const app = express();

const dotenv =  require("dotenv");


dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log("DB connection Successfull !!")).catch((err)=>console.log(err));
  console.log("Connected to MongoDB");
}

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);


main().catch(err => console.error(err));

app.listen(8080, () => {
  console.log("Backend Server is running on port 8080");
});
