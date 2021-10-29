import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
const AuthContext = createContext();

const AuthProvider = props => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUserData = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setUser(null);
    } else {
      const options = {
        headers: {
          'x-auth-token': token,
        },
      };
      axios
        .get(`/api/user`, options)
        .then(res => {
          setUser(res.data.user);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setUser(null);
          localStorage.removeItem('token');
        });
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, getUserData }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
