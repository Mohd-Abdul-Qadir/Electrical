const mongoose = require('mongoose')
exports.connectToMongoDB = async ()=> {
  try {
    await mongoose.connect("mongodb+srv://abdul:test123@cluster0.pypohho.mongodb.net/?retryWrites=true&w=majority",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log("Connected to MongoDB...")
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}