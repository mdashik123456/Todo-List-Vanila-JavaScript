const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

//Remove tasks
function removeTask(id){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  //Find the task to be deleted and filter out
  tasks = tasks.filter(function (task){
    return task.id !== +id;
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
  getTasks();
}


// Get tasks from localStorage and print into html list
function getTasks() {
  let tasks = localStorage.getItem("tasks");
  if (tasks == null) {
    tasks = [];
  }else{
    tasks = JSON.parse(tasks);
  }
  outputEl.innerHTML = tasks.map(
    function (task){
      return `
    <li id="item">
            <span>${task.title}</span>
            <button onclick="removeTask('${task.id}')" id="delete">X</button>
          </li>
    `;
    }
  ).join(" ");
}
getTasks();

// Get item from input field and store it into localStorage when "Add task" button click using eventListener
form.addEventListener("submit",(event)=>{
  event.preventDefault();
  let task = inputEl.value;

  // Verify if input field is not empty
  if(!task){
    alert("Please field is empty!");
  } else{
    let tasks;
    if(localStorage.getItem("tasks") === null){ //verify if tasks exist or not
      tasks = [];
    }else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.unshift({ // unshift is used for pushing the data into an array where last inputed data will be position in first index.
      id: Date.now(),
      title: task
    });

    // save the data into local storage.
    localStorage.setItem("tasks",JSON.stringify(tasks));
    //set the input field empty
    inputEl.value = "";
  }
  getTasks();
});
