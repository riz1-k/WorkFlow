import Link from 'next/dist/client/link';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'next/router';
import EditBlog from '../../components/EditBlog';
import { useState } from 'react';
import Backdrop from '../../components/Backdrop';

function Blog({ blog }) {
  const [edit, setEdit] = useState({
    isOpen: false,
    id: null,
    title: '',
    description: '',
    author: '',
    tag: '',
    imageURL: '',
  });

  const article = {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    description: blog.description,
    tag: blog.tag,
    imageURL: blog.imageURL,
    date: blog.date,
  };
  const router = useRouter();
  const deletehandler = id => {
    axios
      .delete(`/api/blogs/${id}`)
      .then(res => {
        router.push('/blogs');
      })
      .catch(err => {
        alert('something went wrong');
      });
  };

  return (
    <>
      {edit.isOpen && (
        <Backdrop loading={false}>
          <EditBlog
            setEdit={setEdit}
            id={edit.id}
            title={edit.title}
            description={edit.description}
            author={edit.author}
            tag={edit.tag}
            imageURL={edit.imageURL}
          />
        </Backdrop>
      )}
      <div className=' dark:bg-gray-900 '>
        <div className='container w-full md:max-w-3xl mx-auto pt-20 '>
          <div className='w-full px-4 md:px-6 text-xl text-gray-800 leading-normal font-poppins '>
            <div className='font-sans'>
              <p className='text-base md:text-sm text-green-500 font-bold'>
                &lt;{' '}
                <Link
                  href='/blogs'
                  className='text-base md:text-sm text-green-500 dark:text-green-300 font-bold no-underline hover:underline'
                >
                  BACK TO BLOGS
                </Link>
              </p>
              <h1 className='font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl'>
                {article.title}
              </h1>
              <p className=' text-sm md:text-base font-normal text-gray-600 dark:text-white '>
                Published {moment(article.date).format('LL')}
              </p>
              <div className='flex py-1'>
                <p
                  onClick={() =>
                    setEdit({
                      isOpen: true,
                      id: article.id,
                      title: article.title,
                      description: article.description,
                      author: article.author,
                      tag: article.tag,
                      imageURL: article.imageURL,
                    })
                  }
                  className='text-sm ml-3 text-green-600 font-bold cursor-pointer hover:underline'
                >
                  Edit
                </p>
                <p
                  onClick={() => deletehandler(article.id)}
                  className='text-sm ml-5 text-red-600 cursor-pointer font-bold hover:underline'
                >
                  Delete
                </p>
              </div>
            </div>

            <img src={article.imageURL} alt='blogImage' />

            <p className='py-6 break-words dark:text-white '>
              {article.description}
            </p>
          </div>
          <div className='inline-block  bg-red-100  px-4 py-2 text-sm font-semibold text-red-600 mr-2'>
            {article.author}
            <p
              href='#'
              className='text-base md:text-sm text-green-500 no-underline hover:underline'
            />
          </div>
        </div>
      </div>
    </>
  );
}

Blog.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${id}`
  );
  const { data } = await res.json();
  return {
    blog: data,
  };
};

export default Blog;
