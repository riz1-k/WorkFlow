import connect from '../../../server/connect';
import User from '../../../server/database/models/userSchema';
import nc from 'next-connect';
import auth from '../../../components/auth';

const handler = nc()
  .use(auth)
  .get(async (req, res) => {
    await connect();
    User.findById(req.user.id)
      .select('-password')
      .populate('todos notes blogs')
      .exec((err, user) => {
        if (err) {
          return res.status(400).json({ msg: 'id not found' });
        }
        return res.status(200).json({ user });
      });
  });

export default handler;
