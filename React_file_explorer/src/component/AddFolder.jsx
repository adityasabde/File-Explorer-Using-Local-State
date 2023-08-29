import React from 'react'
import { ButtonFolderFile } from './ButtonCom'
import { ButtonDelete } from './ButtonCom'
export default function AddFolder({name , store , setstore}) {
  return (
   
    <div id='folder1'   className='box'>
        <span className='rotate'> &#10148; </span>
        <span> {name} </span>
        <ButtonFolderFile store ={store} setstore={setstore} />
        <ButtonDelete store ={store} setstore={setstore}/>
    </div>
  
  )
}

