import React from 'react'

const Antonym = ({mean}) => {
  return (
    
<div className="columns-2 md:columns-3 text-left">
{mean.map((val) =>
  val.meanings.map((means) =>
    means.antonyms?.map((syn) => <li>{syn}</li>)
  )
)}
</div>
  )
}

export default Antonym;
