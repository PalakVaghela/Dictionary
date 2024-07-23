import React from 'react'

const Example = ({mean}) => {
  return (
    <div>
      {mean.map(val=> val.meanings.map(means => means.definitions.map(def => (
        def.example && (
        <div key={def.example}>
            <li className='text-left'>{def.example}</li>
        </div>)
      ))))}
    </div>
   
  )
}

export default Example;
