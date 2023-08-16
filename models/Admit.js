// const mongoose = require('mongoose');

// const admitSchema = new mongoose.Schema({
// name:{
// type:String,},
//   titlesAndDescriptions: [
//     {
//       title: {
//         type: String,
//       },
//       description: {
//         type: String,
//       },
//     },
//   ],
//   content: {
//     type: String,
//   },
//   imageUrl: {
//     type: String,
//     // required: true,
//   },
// }, { timestamps: true });

// const Admit = mongoose.model('Admit', admitSchema);

// module.exports = Admit;



const mongoose = require("mongoose");

const admitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    // titlesAndDescriptions: [
    //   {
    //     title: {
    //       type: String,
    //     },
    //     description: {
    //       type: String,
    //     },
    //   },
    // ],
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Admit = mongoose.model("Admit", admitSchema);

module.exports = Admit;
