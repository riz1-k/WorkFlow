import axios from 'axios';

const EditTodo = ({ setEdit, id, task, setTodos }) => {
  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`/api/todos/${id}`, { task }).then(res => {
      handleClose();
      setTodos(f => {
        const i = f.findIndex(x => x._id == id);
        const temp = [...f];
        temp[i].task = task;
        return temp;
      });
    });

    const handleClose = () => {
      setEdit({
        isOpen: false,
        id: null,
        task: '',
      });
    };

    const handleChange = e => {
      setEdit(f => ({
        ...f,
        [e.target.name]: e.target.value,
      }));
    };

    return (
      <div className='form-container w-6/12 mt-8 mx-auto'>
        <div>
          <div className='  animate animate__fadeInLeft'>
            <form
              className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 animate__animated animate__fadeInDown animate__faster'
              onSubmit={handleSubmit}
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
                  htmlFor='task'
                >
                  Task
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  label='task'
                  placeholder='Task'
                  name='task'
                  value={task}
                  autoSave='off'
                  autoComplete='off'
                  onChange={handleChange}
                />
              </div>

              <div className='flex items-center justify-evenly'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
};

export default EditTodo;
