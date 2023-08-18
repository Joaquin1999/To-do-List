import React from 'react'
import Itemslist from './Itemslist'


const Content = ({items,handlechange,handleDelete}) => {

  return (
    
    <>
      
      {(items.length) ? (
    
    <Itemslist

    items={items}
    handlechange={handlechange}
    handleDelete={handleDelete}
    
    
    />

     ):<p  style= {{color:"red"}} >
      Your List is Empty
     </p> }
    </>
  )
 
}

export default Content


