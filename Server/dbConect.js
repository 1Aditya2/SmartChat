const mongoose = require("mongoose");
//hr138TfgXpERRIyf

//mYbjBVOWOTxNSn7k

module.exports = async () => {
  const mongoUri =
    "mongodb+srv://hero1:mYbjBVOWOTxNSn7k@cluster0.htm52hk.mongodb.net/?retryWrites=true&w=majority";
  try {
    const connect = await mongoose.connect(mongoUri,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected:  ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("error in dbconnect.js");
    process.exit(1);
  }
};
