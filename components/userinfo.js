import { useContext } from 'react';
import { AuthContext } from './globalState';
import Link from 'next/dist/client/link';
import router from 'next/router';

function userinfo({ setinfocard }) {
  const { user, loading } = useContext(AuthContext);
  return (
    <>
      <div className='rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-gray-800 relative animate__animated animate__backInDown animate__faster '>
        <img
          src='https://i.imgur.com/dYcYQ7E.png'
          className='w-full relative z-20'
        />
        <div
          onClick={() => setinfocard(false)}
          className='absolute z-30 text-white right-4 top-3 font-roboto cursor-pointer'
        >
          X
        </div>
        {user && (
          <div className='flex justify-center '>
            <div className='rounded-full h-14 w-14 border-2 border-white  '>
              <img src={user.pfp} alt='' />
            </div>
          </div>
        )}
        <div className='text-center px-3 pb-2 pt-2'>
          <h3 className='text-white text-sm bold font-poster'>
            {user.username}
          </h3>
        </div>
        <div className='text-center px-3 pb-2 '>
          <h3 className='text-white text-sm bold font-work'>{user.email}</h3>
        </div>
        <div className='flex justify-center pb-3 text-white font-work '>
          <div className='text-center mr-3 border-r border-gray-400  pr-3'>
            <h2>{user.todos.length}</h2>
            <span>Todos</span>
          </div>
          <div className='text-center  mr-3 border-r border-gray-400  pr-3'>
            <h2>{user.notes.length}</h2>
            <span>Notes</span>
          </div>
          <div className='text-center  mr-3   pr-3'>
            <h2>{user.blogs.length}</h2>
            <span>Blogs</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default userinfo;
