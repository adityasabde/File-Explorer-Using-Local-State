import React, { useState } from 'react';

// pure function
let parentid = 0;

// function for creating unique id ====================================================

function unique_id(){
    parentid++;
    return parentid;
}


// buttons ======================================================================

export const ButtonFolder = function ({store , setstore , id}) {
  // console.log(store)
  return (
    <div id={id}>
      <button className='sub-icon' onClick={(event)=> onClickFolder(event , store , setstore)}> &#128193; </button>
    </div>
  );
};

export const ButtonFile = function ({store , setstore , id}) {
  return (
    <div id={id}>
      <button className='sub-icon' onClick={(event)=> onClickFile(event , store , setstore)}> &#128196; </button>
    </div>
  );
};

export const ButtonDelete = ({store , setstore , id}) => {
  return <div id={id}><button className='sub-icon' onClick={(event)=>onClickDelete(event , store , setstore)}> &#x2715; </button></div>;
};

export const ButtonRename = ({store , setstore , id}) => {
  return <div id={id} ><button className='sub-icon' onClick={(event) => onClickRename(event , store , setstore)}> &#9998; </button></div>;
};


// Action functions  ==============================================================

const onClickFile = (event , store , setstore )=>{
  let inputValue = window.prompt("enter your file name ");
  
  let parentObj = Iterate_Data_For_Getting_Obj(event.target.parentNode.id , store);

  // checking name is exist
  let arrayOfChildren = parentObj.children;
  for(let obj of arrayOfChildren){
      if(obj.name === inputValue){
          alert("The given name is already exist");
          return;
      }
  }
  let newobj =  createFileNode( parentObj , inputValue , "file" );
  Iterate_Children_And_Push(parentObj.id , store, newobj); 

  setstore([...store]);
}

const onClickFolder = (event , store , setstore)=>{

  let inputValue = window.prompt("enter the name of the folder")
  let parentObj = Iterate_Data_For_Getting_Obj(event.target.parentNode.id , store);
 
//  checking nae is exist
  let arrayOfChildren = parentObj.children;
  for(let obj of arrayOfChildren){
      if(obj.name === inputValue){
          alert("The given name is already exist");
          return;
      }
  }


  let newobj =  createFolderNode(parentObj , inputValue, "folder");

  Iterate_Children_And_Push(parentObj.id , store, newobj);
  setstore([...store]);   //sfor updating the sotre but using previous state and new state 
}

const onClickDelete = (event , store , setstore) =>{ 
 let parentId = event.target.parentNode.id;
//  console.log(parentId)
//  console.log(store)
 deleteNode(parentId , store, store ,setstore);
}

const onClickRename =(event , store , setstore) =>{
  let inputValue=  window.prompt("enter your your new name here................")
  console.log(event.target.parentNode.id)
  Rename(inputValue , store , event.target.parentNode.id , store , setstore);
}


// iterator function...==============================================================

const Iterate_Children_And_Push = ( findId ,  children , newObject  ) => {

  for(let obj of children){
          if(findId === obj.id){
              obj.children.push(newObject)
              return;
          }

         if(obj.children != null){
             Iterate_Children_And_Push( findId , obj.children , newObject );
         }
  }
}

const Iterate_Data_For_Getting_Obj = ( findId ,  children ) => {
  let ans;
  for (let obj of children) {
      if (findId == obj.id) {
          return obj;
      }
      if (obj.children != null) {
          ans = Iterate_Data_For_Getting_Obj(findId, obj.children);
          if (ans) {
              return ans; // Return the answer if found in deeper levels
          }
      }
  }
  return null; // Return null if not found
}


// functions for performing operation on list ========================================

function createFileNode(parentObj, fileName , fileType ){
  let newObj ={
      type: fileType,
      name: fileName ,
      id: "FileId" + unique_id(),
      children: null,
      level: parentObj.level + 1
  }
  return newObj;
}

const createFolderNode = ( parentObj , folderName , folderType ) => {
let newObj ={
  type: folderType,
  name: folderName ,
  id: "FolderId"+ unique_id(),
  children:[],
  level: (parentObj.level) + 1
}
  return newObj;
}

const deleteNode = (id, childrenArray , store , setstore) => {
  if(id ==="1"){
    return;
  }
  for (let i = 0 ; i < childrenArray.length ; i++) {
      if (id === childrenArray[i].id) {
          childrenArray.splice(i , 1);
          setstore([...store])
          return;                
      }
      if (childrenArray[i].children != null) {
          deleteNode(id, childrenArray[i].children , store , setstore);  // Recursively search nested children
      }
  }

}

const Rename = (newname , childrenArray , id , store , setstore)=>{
  for (let i = 0 ; i < childrenArray.length ; i++) {
      console.log(id)
      if (id === childrenArray[i].id) {
       
          childrenArray[i].name = newname;
          setstore([...store])
          return;                
      }
      if (childrenArray[i].children != null) {
          Rename(newname , childrenArray[i].children ,  id , store , setstore);  // Recursively search nested children
      }
  }
}
