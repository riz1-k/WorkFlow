import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { AuthContext } from './globalState';
import { useRouter } from 'next/router';

function Login({ setlogin }) {
  const [user1, setUser1] = useState({ email: '', password: '' });
  const { user, loading, getUserData } = useContext(AuthContext);
  const router = useRouter();
  const ref = useRef(null);

  const body = {
    email: user1.email,
    password: user1.password,
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post(`/api/login`, body)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        getUserData();
        router.reload();
      })
      .catch(err => {
        alert('Invalid credentials');
      });
  };
  const changeHandler = e => {
    setUser1({ ...user1, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster'>
        <div onClick={() => setlogin(false)} className='flex justify-end h-12 '>
          <IoClose className='text-2xl text-gray-600  cursor-pointer' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
            Login
          </h1>
        </div>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
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
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
