import axios from 'axios';
import { useState, useRef, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../components/globalState';
import SignUp from '../../components/signup';
function Todo() {
  const { user, loading } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [newtodo, setNewTodo] = useState({ task: '' });
  const [signup, setsignup] = useState(false);
  const body = { newtodo, user };
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user == null) {
      setsignup(true);
    }
    if (user) {
      setTodos(user.todos);
    }
  }, [loading, user]);

  const submitHandler = e => {
    e.preventDefault();
    axios
      .post(`/api/todos`, body)
      .then(res => {
        router.reload();
      })
      .catch(err => {
        alert(err);
      });
  };

  const changeHandler = e => {
    setNewTodo({
      ...newtodo,
      [e.target.name]: e.target.value,
    });
  };

  const removeTask = id => {
    axios.delete(`/api/todos/${id}`).then(res => {
      const newList = todos.filter(todo => todo.id !== id);
      setTodos(newList);
      router.reload();
    });
  };

  return (
    <>
      {signup && (
        <Backdrop loading={false}>
          <SignUp setsignup={setsignup} />
        </Backdrop>
      )}
      <div className=' h-screen dark:bg-gray-900 '>
        <div className='h-32 sm:w-9/12 lg:w-2/4 mx-auto  flex justify-center items-center'>
          <div className='container mx-auto bg-white dark:bg-gray-600 rounded-lg px-4 border-2'>
            <form onSubmit={submitHandler}>
              <div className='sm:flex items-center bg-white  dark:bg-gray-600 rounded-lg overflow-hidden px-2 py-2 justify-between '>
                <input
                  className='text-base text-gray-600  dark:bg-gray-600 dark:text-white flex-grow outline-none px-2 '
                  type='text'
                  placeholder='Add a Todo'
                  name='task'
                  onChange={changeHandler}
                  ref={ref}
                  autoSave='off'
                  autoComplete='off'
                />
                <button
                  type='submit'
                  className='py-1  text-white  px-2 bg-blue-500 mx-1 rounded-full hover:scale-105'
                >
                  <i className='bx bx-plus-circle'></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        {todos.map((todo, i) => (
          <div
            className=' sm:w-9/12 lg:w-2/5 sm:mt-2 mx-auto flex justify-center items-center  '
            key={todo._id}
          >
            <div className='container mx-auto bg-white dark:bg-gray-100 rounded-md px-4 border-2'>
              <div className='sm:flex items-center bg-white dark:bg-gray-100  rounded-lg overflow-hidden px-2 py-4 justify-between '>
                <div
                  className={`text-base text-gray-700 dark:font-bold flex-grow outline-none px-2 flex `}
                >
                  {todo.task}
                </div>
                <div className='mt-2 md:mt-0 '>
                  <button
                    onClick={() => {
                      removeTask(todo._id);
                    }}
                    className='py-1 text-white  px-2 bg-yellow-400 dark:bg-yellow-500 mx-1 rounded-full hover:scale-105'
                  >
                    <i className='bx bx-check'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todo;
