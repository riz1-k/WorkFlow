import axios from 'axios';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './globalState';

function EditBlog({ setEdit, id, title, author, description, imageURL, tag }) {
  const router = useRouter();

  const submitHandler = e => {
    e.preventDefault();
    axios
      .put(`/api/blogs/${id}`, {
        title,
        description,
        author,
        tag,
        imageURL,
      })
      .then(res => {
        handleClose();
        router.reload();
      });
  };

  const handleClose = () => {
    setEdit({
      isOpen: false,
      id: null,
      title: '',
      author: '',
      description: '',
      tag: '',
      imageURL: '',
    });
  };

  const changehandler = e => {
    setEdit(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='animate animate__fadeInLeft'>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 animate__animated animate__fadeInDown animate__faster'
        onSubmit={submitHandler}
      >
        <div
          onClick={handleClose}
          className=' text-black cursor-pointer font-bold py-1 px-2 rounded-full flex justify-end focus:outline-none focus:shadow-outline'
          type='button'
        >
          X
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='title'
          >
            Title
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='title'
            type='text'
            placeholder='Title'
            name='title'
            onChange={changehandler}
            value={title}
            autoSave='off'
            autoComplete='off'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='description'
            type='text'
            placeholder='Description'
            name='description'
            onChange={changehandler}
            value={description}
            autoSave='off'
            autoComplete='off'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='tag'
          >
            Tag
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='tag'
            type='text'
            placeholder='tag'
            name='tag'
            onChange={changehandler}
            value={tag}
            autoSave='off'
            autoComplete='off'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='imageurl'
          >
            Image URL
          </label>
          <textarea
            className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='imageURL'
            type='text'
            name='imageURL'
            placeholder='ImageURL'
            onChange={changehandler}
            value={imageURL}
            autoSave='off'
            autoComplete='off'
            required
          />
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
