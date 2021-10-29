import { useState, useEffect } from 'react';
import moment from 'moment';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';

function Blog({ id, imageURL, date, title, description, author, tag }) {
  const [expand, setexpand] = useState(false);
  const [mobilescreen, setmobilescreen] = useState(null);

  useEffect(() => {
    setmobilescreen(window.screen.width);
  }, [mobilescreen]);

  return (
    <>
      {mobilescreen < 750 ? (
        <div
          key={id}
          onClick={() => {
            expand ? setexpand(false) : setexpand(true);
          }}
          className='dark:bg-gray-700'
        >
          <div
            className={` grid  ${
              expand
                ? `grid-rows-mobile_blog_expanded`
                : `grid-rows-mobile_blog`
            }  rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-700   transition-all duration-300 cursor-pointer `}
          >
            <a
              href='#'
              className='  font-semibold ml-5 mt-3 font-poppins dark:text-white text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'
            >
              {title}
            </a>
            <div className='relative flex items-center justify-center '>
              <img
                src={imageURL}
                alt='Sunset in the mountains'
                className='w-72 max-h-72 my-auto m-2 rounded-md shadow-lg absolute z-10 border-2 border-gray-200 '
              />
            </div>

            <div className='px-2 flex justify-center '>
              <div>
                <span className='inline-block bg-red-100  px-3 py-1  text-xs font-semibold text-red-600 mr-2'>
                  {author}
                </span>
                <span className='inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-600 mr-2'>
                  #{tag}
                </span>
              </div>
            </div>
            <div className={`px-6 py-4 grid ${expand ? `block` : `hidden`} `}>
              <div className='m-2 overflow-hidden  '>
                <p className='text-gray-600  font-poppins text-sm   '>
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div key={id}>
          <div className='  grid grid-cols-blog rounded overflow-hidden shadow-lg dark:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer '>
            <div className='relative flex items-center'>
              <img
                src={imageURL}
                alt='Sunset in the mountains'
                className='w-64 max-h-60 my-auto m-2 rounded-md shadow-lg  '
              />
              <a href='#!'></a>
              <a href='!#'>
                <div className='text-xs absolute font-poppins top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-12 w-12 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out'>
                  <span className='font-bold'>
                    {moment(date).format('ddd')}
                  </span>
                  <small>{moment(date).format('MMM')}</small>
                </div>
              </a>
            </div>

            <div
              className={`px-6 py-4 grid ${
                expand ? `grid-rows-blog_extra_detail` : `grid-rows-blog_detail`
              } `}
            >
              <a
                href='#'
                className='font-semibold ml-2 dark:text-white font-poppins text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'
              >
                {title}
              </a>
              <div className=' m-2 overflow-hidden  '>
                <p className='text-gray-600 dark:text-white  font-poppins text-sm  overflow-hidden  '>
                  {description}
                </p>
              </div>

              <div className='px-2 flex justify-between '>
                <div>
                  <span className='inline-block bg-red-100  px-4 py-1 lowercase rounded text-sm font-semibold text-red-600 mr-2'>
                    {author}
                  </span>
                  <span className=' inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-600 mr-2 lowercase'>
                    #{tag}
                  </span>
                </div>
                <div className='flex justify-between w-8'>
                  <div
                    onClick={() => {
                      expand ? setexpand(false) : setexpand(true);
                    }}
                    className='flex justify-self-end dark:text-white hover:text-blue-500 text-xl'
                  >
                    {expand ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Blog;
