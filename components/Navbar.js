/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useContext, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import BackDrop from './Backdrop';
import SignUp from './signup';
import { AuthContext } from './globalState';
import Link from 'next/dist/client/link';
import router from 'next/router';
import Userinfo from './userinfo';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Notes', href: '/notes', current: false },
  { name: 'Todo', href: '/todo', current: false },
  { name: ' Blogs', href: '/blogs', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const { user, loading } = useContext(AuthContext);
  const [signup, setsignup] = useState(false);
  const [infocard, setinfocard] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.getElementsByTagName('html')[0].classList.remove('light');
      document.getElementsByTagName('html')[0].classList.add('dark');
      setTheme('dark');
    } else {
      document.getElementsByTagName('html')[0].classList.remove('dark');
      document.getElementsByTagName('html')[0].classList.add('light');
      setTheme('light');
    }
  }, [theme]);

  function toggleTheme() {
    if (theme === 'light') {
      document.getElementsByTagName('html')[0].classList.remove('light');
      document.getElementsByTagName('html')[0].classList.add('dark');
      setTheme('dark');
      localStorage.theme = 'dark';
    } else {
      setTheme('light');
      localStorage.theme = 'light';
      document.getElementsByTagName('html')[0].classList.remove('dark');
      document.getElementsByTagName('html')[0].classList.add('light');
    }
  }

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          {signup && (
            <BackDrop loading={false}>
              <SignUp setsignup={setsignup} />
            </BackDrop>
          )}
          {infocard && (
            <BackDrop loading={false}>
              <Userinfo setinfocard={setinfocard} />
            </BackDrop>
          )}
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative '>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <div
                    onClick={toggleTheme}
                    className='block lg:hidden h-8 w-auto text-2xl text-white'
                  >
                    {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
                  </div>
                  <Link href='/'>
                    <div>
                      <img
                        className='hidden cursor-pointer lg:block h-8 w-auto'
                        src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                        alt='Workflow'
                      />
                    </div>
                  </Link>
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    {navigation.map(item => (
                      <Link
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        key={item.name}
                      >
                        <div
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                          )}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className='text-2xl hidden lg:block text-white'
              >
                {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
              </button>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                      <span className='sr-only'>Open user menu</span>
                      {user && (
                        <div className='h-8 w-8 rounded-full '>
                          <img src={user.pfp} alt='' />
                        </div>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='  origin-top-right cursor-pointer absolute z-30 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => setinfocard(true)}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            )}
                          >
                            Your Profile
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              localStorage.removeItem('token');
                              router.reload();
                            }}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign out
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                {!user && (
                  <button
                    onClick={() => setsignup(true)}
                    className=' ml-5 px-3.5 py-1.5 border-none transition-all duration-300 ease-in-out  text-xs font-semibold text-gray-800 font-poppins rounded-md border-opacity-50  bg-white border-2 border-gray-800'
                  >
                    Sign Up / Login
                  </button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 '>
              {navigation.map(item => (
                <Link
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  key={item.name}
                >
                  <div
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                    )}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
