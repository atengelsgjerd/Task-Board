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
const inProgress = $("#in-progress");
const completed = $("#completed");


function getDaysDifference(dueDate) {
    // const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = dayjs().format('MM/DD/YYYY');
    const dueDateObj = dayjs(dueDate).format('MM/DD/YYYY');
    const diffDays = Math.abs(dayjs(dueDate).diff(dayjs(), 'day'));
    console.log("current date", currentDate);
    console.log("due date", dueDateObj);
    return diffDays;
}
confirmTaskBtn.on("click", function(){
    console.log("I'm going to make a card");
    const modalObject = {
        id: nextId,
        taskTitle: taskTitleInput.val(),
        taskDueDate: dueDateInput.val(),
        taskDescription: taskDescriptionInput.val(),
        status: "toDoo"
    };

    nextId++;
    taskList.push(modalObject);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", nextId);
    taskTitleInput.val('');
    dueDateInput.val('');
    taskDescriptionInput.val('');
    renderTaskList();
return;
});
//When the button with the id #addTskBtn is clicked, a modal form will show
taskBtn.on("click", function(){
    $("#formModal").modal("show");

    //When the Date input field is clicked into, a datepicker widget appears.
    $("#formModal").on('shown.bs.modal', function() {
        $("#datePicker").datepicker();
    });
    //When the button with the id #confirmTsk is clicked, the information gets saved as an array in local storage and is displayed as a card.
    
   
   
    

   
});

    $(document).ready(function(){
        $(".droppable").droppable({
            drop: function(event,ui) {
                $(this)
                ui.draggable.css("z-index", 1000);
                console.log(ui.draggable.data("task-id"));
                console.log(event.target.id);
                taskList.forEach((task) => {
                    if (task.id === ui.draggable.data("task-id")) {
                        task.status = event.target.id;
                    }
                    
                });
                localStorage.setItem("tasks", JSON.stringify(taskList));
                renderTaskList();
            }
        });
        renderTaskList();
    });

    
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {


    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();
    taskList.forEach((task) => {

        const taskElement = document.createElement("div");
        taskElement.dataset.taskId = task.id;
        taskElement.classList.add("card", "draggable", "text-center", "mb-3");

        const daysDifference = getDaysDifference(task.taskDueDate);
        console.log("task due date",task.taskDueDate);
        console.log("days diff",daysDifference);
        if (daysDifference <= 0) {
            taskElement.classList.add("overdue");
        } else if (daysDifference <= 2) {
            taskElement.classList.add("near-due");
        }
        taskElement.style.width = "18rem";
        taskElement.innerHTML = `
        <h5 class="card-title">${task.taskTitle}</h5>
        <h6>${task.taskDueDate}</h6>
        <p class="card-text">${task.taskDescription}</p>
        <button class="btn btn-primary" id="deleteBtn">Delete</button>
        `;

        if (task.status === "toDoo") {
            $('#todo-cards').append(taskElement);
        } else if (task.status === "inProgress") {
            $('#in-progress-cards').append(taskElement);
        } else {
            taskElement.classList.add('completed');
            $('#done-cards').append(taskElement);
        }
        

    console.log(JSON.parse(localStorage.getItem("tasks")));


    $(taskElement).draggable({
        start: function(event, ui) {
            $(this).css("z-index", 1000);
        },
        stop: function(event,ui) {
            $(this).css("z-index", 1);
        }
        
    });
    toDoSection.on("click", ".card #deleteBtn", function(){
        const taskId = $(this).closest(".card").data("task-id");
        taskList = taskList.filter(task => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        $(this).parent().remove();
    });
    inProgress.on("click", ".card #deleteBtn", function(){
        const taskId = $(this).closest(".card").data("task-id");
        taskList = taskList.filter(task => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        $(this).parent().remove();
    });
    completed.on("click", ".card #deleteBtn", function(){
        const taskId = $(this).closest(".card").data("task-id");
        taskList = taskList.filter(task => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        $(this).parent().remove();
    });
    
});
}
