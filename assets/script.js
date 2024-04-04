// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

const taskBtn = $("#addTskBtn");
const datePicker = $("#datePicker");
const taskTitleInput = $("#taskTitle");
const dueDateInput = $("#datePicker");
const taskDescriptionInput = $("#taskDescription");
const confirmTaskBtn = $("#confirmTsk");
const toDoSection = $("#toDo");

taskBtn.on("click", function(){
    $("#formModal").modal("show");


    $("#formModal").on('shown.bs.modal', function() {
        $("#datePicker").datepicker();
    });

    confirmTaskBtn.on("click", function(){
        
        const modalObject = {
            id: nextId,
            taskTitle: taskTitleInput.val(),
            taskDueDate: dueDateInput.val(),
            taskDescription: taskDescriptionInput.val(),

        };

        taskList.push(modalObject);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        localStorage.setItem("nextId", nextId + 1);

        console.log(JSON.parse(localStorage.getItem("tasks")));
    });
});

taskList.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("card", "draggable", "text-center", "mb-3");
    taskElement.style.width = "18rem";
    taskElement.innerHTML = `
    <h5 class="card-title">${task.taskTitle}</h5>
    <h6>${task.taskDueDate}</h6>
    <p class="card-text">${task.taskDescription}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
    `;
    //taskElement.style.position = "absolute";
    taskElement.style.zIndex = 1;
    toDoSection.append(taskElement);

    $(taskElement).draggable({
        start: function(event, ui) {
            $(this).css("z-index", 1000);
        },
        stop: function(event,ui) {
            $(this).css("z-index", 1);
        }
    });
});

    $(document).ready(function(){
        $(".droppable").droppable({
            drop: function(event,ui) {
                $(this)
                ui.draggable.css("z-index", 1000);
            }
        });
    });
    
    

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
   
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});