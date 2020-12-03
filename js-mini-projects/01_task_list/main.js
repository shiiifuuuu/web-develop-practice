// variables
const txtInput = document.getElementById('new-task');
const formTask = document.getElementById('task-form');
const txtInputFilter = document.getElementById('filter-task');
const listTasks = document.getElementById('tasks');
const btnClearTasks = document.getElementById('clear-task');

loadAllEvents();

function loadAllEvents(){
   //add
   formTask.addEventListener('submit', addTask);
   //show
   document.addEventListener('DOMContentLoaded', showTasks);
   //filter
   txtInputFilter.addEventListener('keyup', filterTask);
   //delete tasks
   listTasks.addEventListener('click', removeTask);
   //clear all tasks
   btnClearTasks.addEventListener('click', clearAllTask);
}

//Following 3 functions are responisble for adding task in the UI and Local Storage
//testing
// createTask(1);
//setTaskInLocalStorage('getme');
function addTask(e){
   e.preventDefault();
   let value = txtInput.value;
   if(value===''){
      window.alert('No task mentioned!');
   }else{
      let task = createTask(value);
      if(listTasks.style.display==='none'){
         listTasks.style.display='block';
      }
      listTasks.appendChild(task);
      
      //save task in local storage
      setTaskInLocalStorage(value);
   }
   //input text reset
   txtInput.value='';
   // console.log(value);
}
function createTask(value){
   let li = document.createElement('li');
   li.className='task';
   li.appendChild(document.createTextNode(value));
   let a = document.createElement('a');
   a.setAttribute('href', '#');
   a.className = 'delete-task';
   a.innerHTML = '<i class="far fa-trash-alt"></i>';
   li.appendChild(a);
   return li;
   // console.log(li);
}
//Get Task from Local Storage
function getTaskFromLocalStorage(){
   let tasks;
   if(localStorage.getItem('tasks')===null){
      tasks = [];
   }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   return tasks;
}
//Set Task in Local Storage
function setTaskInLocalStorage(value){
   let tasks = getTaskFromLocalStorage();
   tasks.push(value);
   // saving new taskList to LS
   localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Showing Task from Local Storage
function showTasks(e){
   let tasks = getTaskFromLocalStorage();
   if(tasks.length===0){
      listTasks.style.display='none';
   }else{
      tasks.forEach(function(task){
         listTasks.appendChild(createTask(task));
      });
      listTasks.style.display='inherit';
   }
}

//Filtering Task
function filterTask(e){
   let input = e.target.value.toLowerCase();
   // let tasks = getTaskFromLocalStorage();
   let tasks = document.querySelectorAll('#tasks .task');
   // console.log(listTasks.childNodes.length);
   tasks.forEach(function(task){
      let item = task.firstChild.textContent.toLowerCase();
      if(item.indexOf(input)!=-1){
         task.style.display = 'flex';
      }else{
         task.style.display = 'none';
      }
   });
}

//Remove a task
function removeTask(e){
   e.preventDefault();
   // console.log(e.target.parentElement.classList.contains('delete-task'));
   if(e.target.parentElement.classList.contains('delete-task')){
      e.target.parentElement.parentElement.remove();
   }
   if(listTasks.children.length===0){
	  listTasks.style.display='none';
   }
   //delete from local storage
   let task = e.target.parentElement.previousSibling.textContent;
   deleteTaskFromLocalStorage(task);
}
function deleteTaskFromLocalStorage(item){
   let tasks = getTaskFromLocalStorage();
   tasks.forEach(function(task, index){
      if(task===item){
         tasks.splice(index,1);
      }
   });
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear All Task
function clearAllTask(e){
   e.preventDefault();
   // listTasks.firstChild
   // console.log(listTasks.removeChild(listTasks.firstChild));
   while(listTasks.children.length>0){
      listTasks.removeChild(listTasks.firstChild);
   };

   //remove All from Local Storage
   removeAllFromLocalStorage();
}
function removeAllFromLocalStorage(){
   localStorage.clear();
   listTasks.style.display='none';
}