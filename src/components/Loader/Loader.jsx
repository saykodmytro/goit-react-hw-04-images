import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={{ zIndex: '1000', position: 'fixed', left: '45%', top: '44%' }}>
      {' '}
      <ColorRing
        visible={true}
        height="160"
        width="160"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
      />
    </div>
  );
};

export default Loader;
