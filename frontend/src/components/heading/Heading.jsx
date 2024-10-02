import React from 'react'

const Heading = ({title}) => {
  return (
    <div className='container mx-auto mt-20 mb-8 flex flex-col items-center gap-4'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <div className="w-24 h-1 bg-primary"></div>
    </div>
  )
}

export default Heading