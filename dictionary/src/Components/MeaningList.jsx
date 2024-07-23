import React from 'react'

const MeaningList = ({mean}) => {
  return (
    <div>
      {mean.map(val=>val.meanings.map(means => means.definitions.map(def => (
        <div>
            <li className='text-left'>{def.definition}</li>
        </div>
      ))))}
    </div>
  )
}

export default MeaningList;
