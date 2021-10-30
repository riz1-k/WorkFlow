import axios from 'axios';
import Backdrop from '../../components/Backdrop';
import Newnote from '../../components/Newnote';
import { useState, useContext, useEffect } from 'react';
import EditNote from '../../components/EditNote';
import { useRouter } from 'next/router';
import { AuthContext } from '../../components/globalState';
import SignUp from '../../components/signup';

export default function Home() {
  const [edit, setEdit] = useState({
    isOpen: false,
    id: null,
    title: '',
    description: '',
  });
  const { user, loading } = useContext(AuthContext);
  const [addClick, setAddClick] = useState(false);
  const [notes, setnotes] = useState([]);
  const [signup, setsignup] = useState(false);
  useEffect(() => {
    if (!loading && user == null) {
      setsignup(true);
    }
    if (user) {
      setnotes(user.notes);
    }
  }, [loading, user]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      axios
        .delete(`/api/notes/${id}`)
        .then(res => {
          const notesList = notes.filter(note => note._id !== id);
          setnotes(notesList);
        })
        .catch(err => {
          throw err;
        });
    }
  };

  return (
    <div className='h-screen dark:bg-gray-900  '>
      {addClick && (
        <Backdrop loading={false}>
          <Newnote setAddClick={setAddClick} />
        </Backdrop>
      )}
      {edit.isOpen && (
        <Backdrop loading={false}>
          <EditNote
            setEdit={setEdit}
            id={edit.id}
            title={edit.title}
            description={edit.description}
            setnotes={setnotes}
          />
        </Backdrop>
      )}
      {signup && (
        <Backdrop loading={false}>
          <SignUp setsignup={setsignup} />
        </Backdrop>
      )}

      <div className='flex  flex-wrap  animate__animated animate__fadeInLeft animate__faster  '>
        <h1 className='text-2xl mt-5 dark:text-white font-bold ml-6 mr-4 '>
          Your Notes
        </h1>

        <button
          onClick={() => setAddClick(true)}
          className='py-1 text-white mt-5 px-2 bg-blue-500 mx-1 rounded-full hover:scale-105'
        >
          <i className='bx bx-plus-circle'></i>
        </button>
      </div>

      <div className='flex justify-start flex-wrap space-x-2 space-y-5'>
        {notes.map(note => {
          return (
            <div key={note._id}>
              <div className=' dark:bg-gray-700 bg-gray-200 border-2 border-black m-5 cursor-pointer hover:scale-105 transition-all ease-in-out w-48  rounded-lg overflow-hidden '>
                <div className=' m-3 font-bold border-b-2 dark:text-white '>
                  {note.title}
                </div>
                <div className=' m-3 overflow-x-hidden dark:text-white '>
                  {note.description}
                </div>
                <div className='flex justify-end m-3'>
                  <button
                    onClick={() =>
                      setEdit({
                        isOpen: true,
                        id: note._id,
                        title: note.title,
                        description: note.description,
                      })
                    }
                    className='py-1 text-white  px-2 bg-green-500 mx-1 rounded-full hover:scale-105'
                  >
                    <i className='bx bxs-edit-alt '></i>
                  </button>

                  <button
                    onClick={() => deleteHandler(note._id)}
                    className='py-1 text-white  px-2 bg-red-500 mx-1 rounded-full hover:scale-105'
                  >
                    <i className='bx bxs-calendar-x  '></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
