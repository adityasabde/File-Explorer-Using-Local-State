// dispatcher with dispatch function and array of callback function=====================

const Dispatcher = {
    callbacks: [], 

    register(callback){
        this.callbacks.push(callback);
    },

    dispatch(action){
        this.callbacks.forEach(callback => callback(action))
    }
};

// store ===================================================================

const File_Folder_Store ={
    state:[
        {
            type:"folder",
            name:"Root",
            id: unique_id(),
            level:0,
            children:[
                
            ]
        }
     ]
    ,

    getState(){
        return this.state;
    }
    ,
    handleAction(Action){
        if(Action.type === "AddFolder"){
            // folder add function call to list
            Iterate_Children_And_Push(Action.parent_id , this.state , Action.folderobj)
            console.log("after element adding "  , this.state)
        }
        else if(Action.type === "AddFile"){
            Iterate_Children_And_Push(Action.parent_id , this.state , Action.fileobj) 
            //  file adding function call to list
        }
        else if(Action.type === "Delete"){
            // delete object item from listt function call
            deleteNode(Action.parentid , File_Folder_Store.state , Action.delete_child_id )
            console.log("updated state after delete " , this.state)
        }
    },

    emitChange(){
        console.log("store changes " , this.state)
    }
}


const ExplorerView = {
    init(){
        console.log("init function call");
        counter=0;
        this.rootElement = document.getElementById("main");
        console.log( "root element  " , this.rootElement)
        this.render();
    },

    render(){
        console.log("render function call");
        const dataStore = File_Folder_Store.getState();
        this.rootElement.innerHTML = "";
        counter = 0 ;
        Iterate_Children_for_print(this.rootElement , dataStore);
    }
}

// Action Creators
function Add_Folder_Action(folderobj , parent_id){
    return {
        type : "AddFolder",
        folderobj,
        parent_id
    };
}
function Add_File_Action(fileobj , parent_id){
    return {
        type : "AddFile",
        fileobj,
        parent_id
    }
}
function Delete_Action(parentid , delete_child_id){
    return {
        type : "Delete",
        parentid,
        delete_child_id
    }
}

// connect store to dispatcher
Dispatcher.register(File_Folder_Store.handleAction.bind(File_Folder_Store));


// initailize view 
ExplorerView.init();



// Event Listener
const onClickFolder = (event)=>{
    // getting value of input tag
    let inputValue = document.getElementById("InputValueId").value; 
   
    let parentObj = Iterate_Data_For_Getting_ParentObj(event.parentNode.id , File_Folder_Store.state);
    let new_obj = createFolderNode(inputValue , "folder" , parentObj );
    console.log("new object in onclick folder function " , new_obj);

    // calling dispatcher function
    Dispatcher.dispatch(Add_Folder_Action(new_obj , parentObj.id));
    ExplorerView.render()
}  

const onClickFile = (event)=>{
       // getting value of input tag
    let inputValue = document.getElementById("InputValueId").value;

    let parentObj = Iterate_Data_For_Getting_ParentObj(event.parentNode.id , File_Folder_Store.state);
    let new_obj = createFileNode(parentObj, inputValue , "file" );
    console.log("new object in onclick file function " , new_obj);
  
    // calling dispatcher function
    Dispatcher.dispatch(Add_File_Action(new_obj , parentObj.id));
    ExplorerView.render()
     
}

const onClickDelete = (event) =>{ 
    let parentId = event.parentNode.parentNode.id;
    console.log(parentId)
    Dispatcher.dispatch(Delete_Action(parentId , event.parentNode.id));
    ExplorerView.render()
}




