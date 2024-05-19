const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'Username is required!'],
  },
  image:{
    type:String,
    required:[true, 'Image is required!'],
  },
  age:{
    type:Number,
    required:[true, 'Age is required!'],
  },
  description:{
    type:String,
    required:[true, 'Description is required!'],
  },
  location:{
    type:String,
    required:[true, 'Location is required!'],
  },
  owner:{
    type:mongoose.Types.ObjectId,
    ref:'User',
  },
  comments:[
    {
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    message:{
        type:String,
    },
  }
]
});

const Photo = mongoose.model('Photo' , photoSchema);

module.exports = Photo;