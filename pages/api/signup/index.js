import connect from '../../../server/connect';
import User from '../../../server/database/models/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';

export default async (req, res) => {
  await connect();
  const { username, email, password } = req.body;
  const seed = Math.floor(Math.random() * 1000);

  if ((!username, !email, !password)) {
    return res.status(400).json({ msg: 'fill the required fields' });
  }

  //check for existing user
  User.findOne({ email }).then(item => {
    if (item) {
      res.status(400).json({ msg: 'Email already exists' });
    }
    const pfp = `https://avatars.dicebear.com/api/bottts/${seed}.svg`;
    const newUser = new User({ username, email, password, pfp });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  password: user.password,
                },
                msg: 'Accout created',
              });
            }
          );
        });
      });
    });
  });
};
