require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set('strictQuery',false)
console.log(process.env.DATABASE_URL)



async function connection() {
  try {
    const result = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if(result)console.log("database connected successfully")
    
  } catch (e) {
    console.log(e);
  }
};

module.exports = connection