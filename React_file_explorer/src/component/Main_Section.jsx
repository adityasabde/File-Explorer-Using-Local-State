import React from 'react'
import InputCom from './InputCom'
import { useState } from 'react'
import FileSystemItem from './FileSystemItem'

export default function Main_Section() {
 const  [ store , setstore ] = useState([
    {
        type:"folder",
        name:"folder1",
        id:"1",
        level:0,
        children:[
            {
                type:"file",
                name:"file1",
                id:"2",
                level:0,
                children:null
            }
            ,
            {
                type:"folder",
                name:"folder2",
                id:"3",
                level:0,
                children:[
                    {
                        type:"file",
                        name:"file2",
                        id:"4",
                        level:0,
                        children:null
                    }
                ]
            }
        ]
    }
 ])

//  console.log(store);
  return (
     <>
     <div>
        <h1>File System Example</h1>
       
        {
            store.map((item, index) => (
                <FileSystemItem key={index} item={item } store={store} setstore ={setstore}/>
            ))
        }
      </div>
     </>
  )
}
