const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: {
      type: [String],
      default:[]
    },
  
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  comments: {
    type: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          default: null,
        },
        user_name:{
          type:String,
          default:''
        },
        comment: {
          type: String,
          default: '',
        },
      },
    ],
    default: [],
  },

  tags: [
    {
      type: String,
    },
  ],
  saves: {
    type: Number,
    default: 0,
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  readTime: {
    type: String,
    required: true
  },
  likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = {Post}
