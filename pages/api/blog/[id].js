import Link from 'next/dist/client/link';
import moment from 'moment';

function Blog({ blog }) {
  const article = {
    title: blog.title,
    author: blog.author,
    description: blog.description,
    imageURL: blog.imageURL,
    date: blog.date,
  };
  return (
    <>
      <div className='container w-full md:max-w-3xl mx-auto pt-20'>
        <div className='w-full px-4 md:px-6 text-xl text-gray-800 leading-normal font-poppins '>
          <div className='font-sans'>
            <p className='text-base md:text-sm text-green-500 font-bold'>
              &lt;{' '}
              <Link
                href='/'
                className='text-base md:text-sm text-green-500 font-bold no-underline hover:underline'
              >
                BACK TO BLOGS
              </Link>
            </p>
            <h1 className='font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl'>
              {article.title}
            </h1>
            <p className=' text-sm md:text-base font-normal text-gray-600'>
              Published {moment(article.date).format('LL')}
            </p>
          </div>

          <img src={article.imageURL} alt='blogImage' />

          <p className='py-6'>{article.description}</p>
        </div>
        <div className='inline-block bg-red-100  px-4 py-2 text-sm font-semibold text-red-600 mr-2'>
          {article.author}
          <p
            href='#'
            className='text-base md:text-sm text-green-500 no-underline hover:underline'
          />
        </div>
      </div>
    </>
  );
}

Blog.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${BACKEND_URL}/api/blogs/${id}`);
  const { data } = await res.json();
  return {
    blog: data,
  };
};

export default Blog;
