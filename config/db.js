const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      //process.env.DB_MONGO
      //"mongodb+srv://deltapets:deltapets@deltapetsbd.w1lfusa.mongodb.net/test"
      //"mongodb://localhost:27017/deltapets2"
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Conectada");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectarDB;
