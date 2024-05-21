const mongoose = require('mongoose');

const getConnection = async () => {
   
  const uri = process.env.MONGODB_URI;

  try {  
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  }
  catch( e ) {
    console.log("Database error", e);
  }
}

module.exports = getConnection;

