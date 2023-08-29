import React from 'react'
import { ButtonDelete, ButtonFolder , ButtonFile, ButtonRename } from './ButtonCom'; // Assuming you have these components defined
import { useState } from 'react';

export default function FileSystemItem({item , store , setstore}) {
   
    const {type , name , children , level , id  } = item;

  return (
      type ===  'folder' ? (
            <div id={id} style={{ paddingLeft: '10px' }}>
                <div id='folder1'   className='box'>
                    <span className='rotate'> &#10148; </span>
                    <span> {name} </span>
                    <ButtonFolder store ={store} setstore={setstore} id={id} />
                    <ButtonFile store ={store} setstore={setstore} id={id} />
                    <ButtonDelete store ={store} setstore={setstore} id={id}/>
                    <ButtonRename store ={store} setstore={setstore} id={id}/>
                </div>
                {
                    children.map((item , index)=>(
                        <FileSystemItem key={index} item = {item} store ={store} setstore={setstore} /> 
                    ))
                }
            </div>
        ) : (
            <div id='file1' style={{ paddingLeft: '10px' }}  className='box'>
                <span> { name }</span>
                <ButtonDelete store ={store} setstore={setstore} id={id}/>
                <ButtonRename store ={store} setstore={setstore} id={id}/>
            </div>
        )
  )
}
