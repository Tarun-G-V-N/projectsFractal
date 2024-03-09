import React, {useState} from 'react'

function Pagination(props) {

  let {onPrev, pageNum, onNext} = props;

  return (
    <div className='flex justify-center my-4'>
        <div className='border-2 border-r-0 p-2 rounded-l-xl border-blue-400 cursor-pointer' onClick={onPrev}>Prev</div>
        <div className='border-2 border-r-0 p-2 border-blue-400'>{pageNum}</div>
        <div className='border-2 p-2 rounded-r-xl border-blue-400 cursor-pointer' onClick={onNext}>Next</div>
    </div>
  )
}

export default Pagination