import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './globalState';
import SignUp from './signup';

function Newnote({ setAddClick }) {
  const [form, setForm] = useState({ title: '', description: '' });
  const { user, loading } = useContext(AuthContext);
  const [newnote, setnewnote] = useState('');
  const [signup, setsignup] = useState(false);
  useEffect(() => {
    if (!loading && user == null) {
      setsignup(true);
    }
    if (user) {
      setnewnote(user.notes);
    }
  }, [loading, user, newnote]);

  const router = useRouter();
  const body = {
    form: form,
    user: user,
  };

  const submitHandler = e => {
    e.preventDefault();
    axios
      .post(`/api/notes`, body)
      .then(res => {
        setnewnote(newnote.concat(res.data.note));
        router.reload();
      })
      .catch(err => {
        alert(err);
      });
  };

  const changehandler = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='animate animate__fadeInLeft'>
      {signup && (
        <Backdrop loading={false}>
          <SignUp setsignup={setsignup} />
        </Backdrop>
      )}
      <form
        className='bg-white dark:bg-gray-700  shadow-md rounded px-8 pt-6 pb-8 mb-4 animate__animated animate__fadeInDown animate__faster'
        onSubmit={submitHandler}
      >
        <div
          onClick={() => setAddClick(false)}
          className=' text-black dark:text-white cursor-pointer font-bold py-1 px-2 rounded-full flex justify-end focus:outline-none focus:shadow-outline'
          type='button'
        >
          X
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 dark:text-white text-sm font-bold mb-2'
            htmlFor='title'
          >
            Title
          </label>
          <input
            className='shadow dark:bg-gray-800 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='title'
            type='text'
            placeholder='Title'
            name='title'
            onChange={changehandler}
            autoSave='off'
            autoComplete='off'
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 dark:text-white text-sm font-bold mb-2'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            className='shadow appearance-none  dark:bg-gray-800  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='description'
            type='text'
            name='description'
            placeholder='description'
            onChange={changehandler}
            autoSave='off'
            autoComplete='off'
          />
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newnote;
