import Blog from '../components/Blog';

function index({ blogs }) {
  return (
    <div className=' dark:bg-gray-900 '>
      <div className='max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 '>
        <div className='grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 gap-10'>
          {blogs.map(blog => {
            return (
              <>
                <Blog
                  id={blog._id}
                  imageURL={blog.imageURL}
                  date={blog.date}
                  title={blog.title}
                  author={blog.author}
                  description={blog.description}
                  likes={blog.likes}
                  tag={blog.tag}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default index;

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`);
  const blogs = await res.json();
  return {
    props: { blogs: blogs.data },
  };
};
