import { useState, useEffect, useContext } from 'react';
import Backdrop from '../../components/Backdrop';
import NewBlog from '../../components/NewBlog';
import moment from 'moment';
import Link from 'next/link';
import { AuthContext } from '../../components/globalState';
import SignUp from '../../components/signup';

function Blogs() {
  const [addClick, setAddClick] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [blogs, setblogs] = useState([]);
  const [signup, setsignup] = useState(false);
  const [mobilescreen, setmobilescreen] = useState(null);

  useEffect(() => {
    setmobilescreen(window.screen.width);
  }, [mobilescreen]);

  useEffect(() => {
    if (!loading && user == null) {
      setsignup(true);
    }
    if (user) {
      setblogs(user.blogs);
    }
  }, [loading, user]);

  return (
    <>
      <div className=' dark:bg-gray-900 bg-gray-100 '>
        <>
          {addClick && (
            <Backdrop loading={false}>
              <NewBlog setAddClick={setAddClick} />
            </Backdrop>
          )}
          {signup && (
            <Backdrop loading={false}>
              <SignUp setsignup={setsignup} />
            </Backdrop>
          )}
          <div className=' mt-5 inline-block animate__animated animate__fadeInLeft animate__faster   '>
            <div className=' flex flex-wrap '>
              <h1 className='text-2xl font-bold dark:text-white  ml-6 mr-4 '>
                Your Blogs
              </h1>

              <button
                onClick={() => setAddClick(true)}
                className='py-1 text-white  px-2 bg-blue-500 mx-1 rounded-full hover:scale-105'
              >
                <i className='bx bx-plus-circle'></i>
              </button>
            </div>
          </div>

          <div className='max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 '>
            <div className='grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 gap-10'>
              {blogs.map(blog => {
                return (
                  <>
                    {mobilescreen < 750 ? (
                      <Link href={`/blogs/${blog._id}`}>
                        <div
                          className={` grid  grid-rows-mobile_blog  rounded overflow-hidden shadow-lg bg-white dark:bg-gray-700   transition-all duration-300 cursor-pointer `}
                        >
                          <a
                            href='#'
                            className='font-semibold ml-5 dark:text-white mt-3 font-poppins text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'
                          >
                            {blog.title}
                          </a>
                          <div className='relative flex items-center justify-center '>
                            <img
                              src={blog.imageURL}
                              alt='Sunset in the mountains'
                              className='w-72 max-h-72 my-auto m-2 rounded-md shadow-lg absolute z-10 border-2 border-gray-200 '
                            />
                          </div>
                          <div className='px-2 flex justify-center '>
                            <div>
                              <span className='inline-block bg-red-100  px-3 py-2 text-xs font-semibold text-red-600 mr-2'>
                                {blog.author}
                              </span>
                              <span className='lowercase inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-600 mr-2'>
                                #{blog.tag}
                              </span>
                            </div>
                          </div>

                          <div className='m-2 overflow-hidden  '>
                            <p className='text-gray-600 dark:text-white  font-poppins text-sm   '>
                              {blog.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Link href={`/blogs/${blog._id}`}>
                        <div className=' grid grid-cols-blog rounded overflow-hidden shadow-lg bg-white dark:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer '>
                          <div className='relative flex items-center'>
                            <img
                              src={blog.imageURL}
                              alt='Sunset in the mountains'
                              className='w-64 max-h-60 my-auto m-2 rounded-md shadow-lg '
                            />
                            <a href='#!'></a>
                            <a href='!#'>
                              <div className='text-xs dark:text-white  absolute font-poppins top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-12 w-12 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out'>
                                <span className='font-bold'>
                                  {moment(blog.date).format('ddd')}
                                </span>
                                <small>{moment(blog.date).format('MMM')}</small>
                              </div>
                            </a>
                          </div>

                          <div className='px-6 py-4 grid grid-rows-blog_detail'>
                            <a
                              href='#'
                              className='font-semibold ml-2 dark:text-white  font-poppins text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'
                            >
                              {blog.title}
                            </a>
                            <div className=' m-2 overflow-hidden  '>
                              <p className='text-gray-600 dark:text-white   font-poppins text-sm overflow-hidden '>
                                {blog.description}
                              </p>
                            </div>
                            <div className='px-2 flex items-center '>
                              <span className='inline-block bg-red-100  px-4 py-2 text-sm font-semibold text-red-600 mr-2'>
                                {blog.author}
                              </span>
                              <span className='inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-600 mr-2'>
                                #travel
                              </span>
                              <span className='inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-600 mr-2'>
                                #winter
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default Blogs;
