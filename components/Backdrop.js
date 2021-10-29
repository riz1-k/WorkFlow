import React from 'react';
import PropTypes from 'prop-types';
const classNames = (...classes) => classes.filter(Boolean).join(' ');
const BackDrop = ({
  loading,
  text,
  fullScreen,
  children,
  halfScreen,
  open,
}) => (
  <div
    className={classNames(
      'w-screen h-screen top-0 fixed  flex-col items-center bg-black justify-center bg-opacity-25 p-4 xl:p-0',
      fullScreen ? 'z-50' : halfScreen ? 'z-40' : 'z-30',
      open ? 'flex' : 'hidden'
    )}
  >
    {loading ? (
      <div className='flex items-center'>
        <div
          className='animate-spin h-10 w-10 xl:h-16 xl:w-16 rounded-full border-4 border-red-400'
          style={{ borderTop: 0, borderRight: 0 }}
        />
        <h6 className='text-xl xl:text-4xl ml-4 animate-pulse cursor-default text-white'>
          {text}
        </h6>
      </div>
    ) : (
      children
    )}
  </div>
);
BackDrop.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  halfScreen: PropTypes.bool,
  open: PropTypes.bool,
};
BackDrop.defaultProps = {
  loading: true,
  text: 'Loading...',
  fullScreen: false,
  halfScreen: false,
  open: true,
};
export default BackDrop;
