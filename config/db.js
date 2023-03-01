const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise; // ES6 - promise

mongoose.connect('mongodb+srv://ahmed:yykldZkHuRnwdNC8@cluster0.tpmlujd.mongodb.net/online-shop?retryWrites=true&w=majority', {useNewUrlParser: true,}).then(() => {
      console.log("Connected to online-shop"); },
    (error) => {
      console.log("Error => ", error);
    }
  );