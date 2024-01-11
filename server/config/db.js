const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise; // ES6 - promise
mongoose.connect(process.env.dbUrl, { useNewUrlParser: true, }).then(() => {
  console.log("Connected to online-shop");
},
  (error) => {
    console.log("Error => ", error);
  }
);