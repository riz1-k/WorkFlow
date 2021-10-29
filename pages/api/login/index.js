import connect from '../../../server/connect';
import User from '../../../server/database/models/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  await connect();
  const { email, password } = req.body;

  //simple validation
  if ((!email, !password)) {
    return res.status(400).json({ msg: 'fill the required fields' });
  }

  //check for existing user
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: 'User doesnt exist' });
    }

    //validate passwords
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            res.status(400).json({
              msg: 'All fields have not been entered',
            });
            throw err;
          }
          res.status(200).json({
            token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              password: user.password,
            },
            msg: 'Account verified',
          });
        }
      );
    });
  });
};
