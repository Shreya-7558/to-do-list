let todolistcontEL= document.getElementById ('todoListCount');
let userInEl = document.getElementById("userIn");
let erroeMsgEl= document.getElementById ("errorMsg");





// let todoList = [

//     {
//         title: "HTML",
//         id:1
//     },

//     {
//         title: "CSS",
//         id:2
//     },

//     {
//         title: "JAVASCRIPT",
//         id:3
//     }

// ]


function onGetParsedtodo(){
    let myTodoList = localStorage.getItem("myTodoList");

    if (myTodoList === null){

        return [ ];
    }
    else{
        let parsedTodo= JSON.parse(myTodoList);

        return parsedTodo;
    }
}

let todoList = onGetParsedtodo();



function  onDeleteTodo(todoId){
    let mytodo= document.getElementById(todoId);
    console.log(mytodo);
    todolistcontEL.removeChild (mytodo);
    
    let newTodoId= todoId.slice(4);

    console.log(newTodoId);

    let index= todoList.findIndex((each)=> each.id === todoId );
    todoList.splice(index,1);
    console.log(todoList);
}

function onStatusChanged (checkBoxId, titleId, todoId){
    let checkBoxEl=document.getElementById(checkBoxId);
    let titleIdEl=document.getElementById(titleId);
    
    if(checkBoxEl === true){
        titleIdEl.classList.add("checked");

    }
    else{
        titleIdEl.classList.add("checked");
    }

    let newTodoId= todoId.slice(4);
    let index= todoList.findIndex((each)=> each.id === todoId );
    console.log(index);
    for(let i=0; i<todoList.length; i++){
        if (index===1){
            if(todoList[i].isChecked === false){
                todoList[i].isChecked = true;
            }
            else{
                todoList[i].isChecked = false;
            }
        }

    }

}

function creatAndAppendTodo(todo){

    let checkBoxId= "myCheckbox" + todo.id;
    let titleId= "mytitle" + todo.id;
    let todoId= "todo" + todo.id;

    let listContEl= document.createElement("li");
    listContEl.classList.add("list-cont");
    listContEl.id= todoId;
    todolistcontEL.appendChild(listContEl);

    let checkboxEl= document.createElement("input");
    checkboxEl.type="checkbox" ;
    checkboxEl.id=checkBoxId;
    if (todo.isChecked === true){
        checkboxEl.checked = true;
    }
    checkboxEl.onclick = function(){
        onStatusChanged(checkBoxId, titleId, todoId);
    }
    listContEl.appendChild(checkboxEl);

    let labelEl= document.createElement("label");
    labelEl.classList.add("label-card");
    labelEl.htmlFor=checkBoxId;
    listContEl.appendChild(labelEl);

    let titleEl=document.createElement("h4");
    titleEl.textContent= todo.title;
    titleEl.id= titleId;
    if (todo.isChecked === true){
        titleEl.classList.add("checked");
    }
    labelEl.appendChild(titleEl);

    let deleteBtnEl= document.createElement("button");
    deleteBtnEl.classList.add("delete-btn");
    deleteBtnEl.onclick= function(){
        onDeleteTodo(todoId);
    }
    labelEl.appendChild(deleteBtnEl);

    let trashIconEl= document.createElement("i");
    trashIconEl.classList.add("fa-solid" , "fa-trash");
    deleteBtnEl.appendChild(trashIconEl);
}

for(each of todoList){
    creatAndAppendTodo(each);
}


function onAddTodo(){

    console.log(userInEl.value);
    let eachId= todoList.length + 1;
    let date=new Date();
    let uniqueId = Math.ceil (Math.random() * date.getTime());
  
    let newTodo = {
        title: userInEl.value,
        id:uniqueId,
        isChecked : false

    }

    if(userInEl.value === ""){
        erroeMsgEl.textContent="Please provide the valid Input Massage";

    }
    else{
        creatAndAppendTodo(newTodo);
        todoList.push(newTodo);
        erroeMsgEl.textContent="";
        userInEl.value="";
    }

    console.log(todoList.length);
}

function onSaveTodo(){

    let stringyFyTodo = JSON.stringify(todoList)

    localStorage.setItem("myTodoList" , stringyFyTodo );
}