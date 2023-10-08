const mongoose=require('mongoose')

const schema=new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  publicationYear: Number,
  price: Number,
  quantity: Number,
  description: String,
  imageUrl: String,
}, { timestamps: true }
);
let storebook=mongoose.model("nbook",schema)

module.exports=storebook