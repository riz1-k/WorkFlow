import { Schema, models, model } from 'mongoose';

const BlogSchema = new Schema({
  title: String,
  author: String,
  description: String,
  date: { type: Date, default: Date.now },
  imageURL: String,
  tag: String,
});

export default models.Blog || model('Blog', BlogSchema);
