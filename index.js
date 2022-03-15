const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

const cors = require("cors");
const bodyParser = require("body-parser")

const corsOptions ={
  origin:'https://watchnowapp.netlify.app', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

dotenv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(()=>console.log("DB Connection Successful"))
  .catch(err=>console.log(err));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Pass to next layer of middleware
  next();
});
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