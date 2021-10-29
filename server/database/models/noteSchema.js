import { Schema, models, model } from 'mongoose';

const NoteSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: true,
    maxlength: [2000, 'Description cannot be more than 2000 characters'],
  },
});

export default models.Note || model('Note', NoteSchema);
