const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

const bodyParser = require("body-parser")

dotenv.config();
app.use(cors({ origin: true }));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(()=>console.log("DB Connection Successful"))
  .catch(err=>console.log(err));


app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) =>{
  res.send({
      message: "Welcome to Watchnow App"
  });
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server is running!");
});
