import { Schema, model, models } from 'mongoose';
import Blog from './blogSchema';
import Todo from './todoSchema';
import Note from './noteSchema';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';
let svg = createAvatar(style, {
  seed: 'custom-seed',
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username not entered'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your Email Address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  pfp: {
    type: String,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

export default models.User || model('User', UserSchema);
