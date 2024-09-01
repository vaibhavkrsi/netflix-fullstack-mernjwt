const express = require("express");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("DB connection Successful!!")).catch((err) => console.log(err));
  console.log("Connected to MongoDB");
}

const app = express();

app.use((req, res, next) => {
  console.log(`Received request for: ${req.url}`);
  next();
});

// Enable CORS with dynamic origin checking
const allowedOrigins = ['http://localhost:3000', 'http://localhost:4000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin, like mobile apps or curl requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // If you want to allow cookies to be sent
}));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

main().catch(err => console.error(err));

app.listen(8080, () => {
  console.log("Backend Server is running on port 8080");
});
