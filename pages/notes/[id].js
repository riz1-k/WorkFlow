import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const EditNote = ({ setEdit, id, title, description, setnotes }) => {
  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`/api/notes/${id}`, { title, description }).then(res => {
      handleClose();
      setnotes(f => {
        const i = f.findIndex(x => x._id == id);
        const temp = [...f];
        temp[i].title = title;
        temp[i].description = description;
        return temp;
      });
    });
  };

  const handleClose = () => {
    setEdit({
      isOpen: false,
      id: null,
      title: '',
      description: '',
    });
  };

  const handleChange = e => {
    setEdit(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='form-container w-6/12 mt-8 mx-auto   '>
      <div>
        <div className='  animate animate__fadeInLeft'>
          <form
            className='bg-white dark:bg-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 animate__animated animate__fadeInDown animate__faster'
            onSubmit={handleSubmit}
          >
            <div className='mb-4'>
              <label
                className='block dark:text-white text-gray-700 text-sm font-bold mb-2'
                htmlFor='title'
              >
                Title
              </label>
              <input
                className='shadow dark:bg-gray-800 appearance-none dark:text-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                label='Title'
                placeholder='Title'
                name='title'
                value={title}
                autoSave='off'
                autoComplete='off'
                onChange={handleChange}
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
                className='shadow dark:text-white dark:bg-gray-800 appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                label='Descriprtion'
                placeholder='Description'
                name='description'
                value={description}
                onChange={handleChange}
                autoSave='off'
                autoComplete='off'
              />
            </div>
            <div className='flex items-center justify-evenly'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Update Note
              </button>
              <Link href='/notes'>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='button'
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
