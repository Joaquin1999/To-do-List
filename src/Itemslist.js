import React from 'react'

import Lineitem from './Lineitem'

const Itemslist = ({items,handlechange,handleDelete}) => {
  return (
    <ul>
    {items.map((item)=>(

        <Lineitem 
        
        item={item}
        key={item.id}
        handlechange={handlechange}
        handleDelete={handleDelete}
        
        />
      
      
    ))}
   </ul>




  )
}

export default Itemslist