import React, { useState, useRef, useContext } from 'react';
import Login from './login';
import BackDrop from './Backdrop';
import Link from 'next/link';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { AuthContext } from './globalState';
import { useRouter } from 'next/router';

function SignUp({ setsignup }) {
  const [login, setlogin] = useState(false);
  const [user1, setUser1] = useState({ username: '', email: '', password: '' });
  const { user, loading, getUserData } = useContext(AuthContext);
  const ref = useRef(null);
  const router = useRouter();
  if (user && !loading) {
    router.push('/');
  }

  const body = {
    username: user1.username,
    email: user1.email,
    password: user1.password,
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post(`/api/signup`, body)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        getUserData();
        setsignup(false);
      })
      .catch(err => {
        if (err.response.data.msg) {
          return alert(err.response.data.msg);
        }
        alert('Signup error');
      });
  };
  const changeHandler = e => {
    setUser1({ ...user1, [e.target.name]: e.target.value });
  };

  return (
    <>
      {login && (
        <BackDrop loading={false}>
          <Login setlogin={setlogin} />
        </BackDrop>
      )}
      <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster'>
        <div
          onClick={() => setsignup(false)}
          className='flex justify-end h-12 '
        >
          <IoClose className='text-2xl text-gray-600  cursor-pointer' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
            Create An Account
          </h1>
          <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-default'>
            Create an account to enjoy all the services without any ads!
          </p>
        </div>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Full name'
              required
              aria-required='true'
              name='username'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              autoSave='off'
              onChange={changeHandler}
            />
            <input
              type='email'
              placeholder='Email'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              required
              aria-required='true'
              name='email'
              autoSave='off'
              onChange={changeHandler}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              required
              onChange={changeHandler}
              aria-required='true'
              autoSave='off'
            />
          </div>
          <div className='text-center mt-6'>
            <button
              type='submit'
              className='block transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-lg'
            >
              Create Account
            </button>

            <p
              onClick={() => {
                setlogin(true);
              }}
              className='mt-4 text-md  font-medium '
            >
              Already Have An Account?
              <span className='hover:underline cursor-pointer'> Sign In</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
