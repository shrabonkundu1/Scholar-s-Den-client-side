import React from 'react';

const TutorCards = ({tutor}) => {
    const {name,image,email} = tutor;
    return (
        <div className='px-10 py-8 bg-gradient-to-r from-[#bbecf5] to-[#d0f8c9] shadow-xl flex flex-col justify-center items-center gap-1 mr-8 rounded-sm'>
            <img className='w-20 h-20 rounded-full object-cover' src={image} alt={name} />
            <p className='py-2'>{email}</p>
            <p className='text-black text-xl font-semibold font-Cinzel'>{name}</p>
        </div>
    );
};

export default TutorCards;