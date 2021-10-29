import connect from '../../../server/connect';
import Note from '../../../server/database/models/noteSchema';
import User from '../../../server/database/models/userSchema';

export default async (req, res) => {
  await connect();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const notes = await Note.find({});
        res.status(200).json({ success: true, notes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const newnote = await Note.create(req.body.form);
        const savednote = await newnote.save();
        User.findById(req.body.user._id)
          .select('notes')
          .exec((err, user) => {
            user.notes.push(savednote);
            user.save();
            return res.status(200).json({ success: true, savednote });
          });
      } catch (error) {
        res.status(400).json({ msg: 'Couldnt save the note' });
      }
      break;
  }
};
