import connect from '../../../server/connect';
import Blog from '../../../server/database/models/blogSchema';
import User from '../../../server/database/models/userSchema';

export default async (req, res) => {
  await connect();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const blogs = await Blog.find({});
        res.status(200).json({ success: true, data: blogs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const newblog = await Blog.create(req.body.form);
        const savedblog = await newblog.save();
        User.findById(req.body.user._id)
          .select('blogs')
          .exec((err, user) => {
            user.blogs.push(savedblog);
            user.save();
            return res.status(200).json({ success: true, savedblog });
          });
      } catch (error) {
        res.status(400).json({ msg: 'Couldnt save the todo' });
      }
      break;
  }
};
