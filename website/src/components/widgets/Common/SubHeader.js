import React from 'react';

const SubHeader = () => {

  let contactNo = process.env.NEXT_EMERGENCY_CONTACT_NO;
  return (
    <nav className='w-full flex justify-center items-center bg-gray-800 py-1.5 px-4 md:px-8 lg:px-16'>
      <div className='text-center'>
        <span className='text-xs  text-white md:text-xs lg:text-xs font-semibold'>For Emergency Consultation : {contactNo}</span>
      </div>
    </nav>
  );
};

export default SubHeader;
