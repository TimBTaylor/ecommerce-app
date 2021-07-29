const mongoose = require("mongoose");

const db = async () => {
  try {
    const conct = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = db;
