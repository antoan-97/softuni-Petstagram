const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'Name is required!'],
    minLength:[2, 'Name should be at least 2 characters long!']
  },
  image:{
    type:String,
    required:[true, 'Image is required!'],
    match:[/^https?:\/\//, 'Invalid URL!']
  },
  age:{
    type:Number,
    required:[true, 'Age is required!'],
    min: [1, 'Minimum age its 1'],
    max: [100, 'Maximum age its 100']
  },
  description:{
    type:String,
    required:[true, 'Description is required!'],
    minLength: [5, 'Description should be at least 5 characters long!'],
    maxLength: [50, 'Description should be at maximum 50 characters long!']
  },
  location:{
    type:String,
    required:[true, 'Location is required!'],
    minLength: [5, 'Location should be at least 5 characters long!'],
    maxLength: [50, 'Location should be at maximum 50 characters long!']
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