import connect from '../../../server/connect';
import Todo from '../../../server/database/models/todoSchema';
import User from '../../../server/database/models/userSchema';

export default async (req, res) => {
  await connect();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const todos = await Todo.find({});
        res.status(200).json({ success: true, todos });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const newtodo = await Todo.create(req.body.newtodo);
        const savedtodo = await newtodo.save();
        User.findById(req.body.user._id)
          .select('todos')
          .exec((err, user) => {
            user.todos.push(savedtodo);
            user.save();
            return res.status(200).json({ success: true, savedtodo });
          });
      } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Couldnt save the todo' });
      }
      break;
  }
};
