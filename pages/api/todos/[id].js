import dbConnect from '../../../server/connect';
import Todo from '../../../server/database/models/todoSchema';

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const todo = await Todo.findById(id);

        if (!todo) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const todo = await Todo.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!todo) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedTodo = await Todo.deleteOne({ _id: id });

        if (!deletedTodo) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
