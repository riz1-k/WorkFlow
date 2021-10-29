import { verify } from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  //Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, Not authorized' });
  }

  try {
    //Verify Token
    const decoded = verify(token, process.env.JWT_SECRET);
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token Expired' });
  }
};

export default auth;
