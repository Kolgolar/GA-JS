let taskNameInput = document.getElementById('taskNameInput');
document.getElementById('b1').addEventListener("click", colorEven);
document.getElementById('b2').addEventListener("click", colorOdd);
document.getElementById('b3').addEventListener("click", removeLast);
document.getElementById('b4').addEventListener("click", removeFirst);

let addNewTask = document.getElementById('addNewTask').addEventListener("click", onAddNewTask);

window.addEventListener("load", () => {
	const savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
	console.log(savedTasks);
	for (let i = 0; i < savedTasks.length; i++) {
		console.log(savedTasks[i], i);
		createTask(savedTasks[i], i);
	}});


function Task(name, isChecked) {
	this.name = name;
	this.isChecked = isChecked;
}


function colorEven(){
	var allButtons = document.querySelectorAll("li");
	for (let i = 0; i < allButtons.length; i++) {
		if ((i + 1) % 2 == 0) {
			allButtons[i].style["background-color"] = "#ffa6a6";
		}
	}
}


function colorOdd(){
	var allButtons = document.querySelectorAll("li");
	for (let i = 0; i < allButtons.length; i++) {
		if (i % 2 == 0) {
			allButtons[i].style["background-color"] = "#c8a6ff";
		}
	}
}


function removeLast(){
	let tasks = document.querySelectorAll("li");
	if (tasks.length > 0) {
		let id = tasks.length - 1;
		let last = tasks[id];
		removeTask(last, id);
	}
}


function removeFirst(){
	let tasks = document.querySelectorAll("li");
	if (tasks.length > 0) {
		let first = tasks[0];
		removeTask(first, 0);
	}
}


function removeTask(task, id) {
	task.parentNode.removeChild(task)
	const savedTasks = JSON.parse(localStorage.getItem('savedTasks')) || [];
	savedTasks.splice(id, 1);
	localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
}


function createTask(task, id) {
	let newTask = document.createElement("li");
	let newTaskName = document.createTextNode(task.name);
	if (task.isChecked) {
		document.getElementById("completedTasks").appendChild(newTask);
	}
	else {
		let newTaskCompleteB = document.createElement("button");
		newTaskCompleteB.innerHTML = "COMPLETE";
		newTaskCompleteB.className = "completeTask";
		newTask.appendChild(newTaskCompleteB);
		document.getElementById("tasks").appendChild(newTask);
		newTaskCompleteB.addEventListener("click", function(event) {
			checkTask(newTask, id);
		});
	}
	newTask.appendChild(newTaskName);
	newTask.setAttribute("class", "task");
	taskNameInput.value = "";

	let crossSpan = document.createElement("span");
	let cross = document.createElement("button");

	cross.innerHTML = 'x';
	crossSpan.className = "deleteTask";

	crossSpan.appendChild(cross);
	newTask.appendChild(crossSpan);
	cross.addEventListener("click", function() {
		removeTask(newTask, id);
	}, false);
}

function getLocalStorage() {
	return JSON.parse(localStorage.getItem('savedTasks')) || [];
}


function checkTask(task, id) {
	task.parentNode.removeChild(task)
	document.getElementById("completedTasks").appendChild(task);
	let completeB = task.getElementsByTagName('button')[0];
	completeB.parentNode.removeChild(completeB);
	task.setAttribute("class", "completedTask");
	const savedTasks = JSON.parse(localStorage.getItem('savedTasks')) || [];
	savedTasks[id].isChecked = true;
	console.log(savedTasks);
	localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
}


function onAddNewTask() {
	let taskName = taskNameInput.value;
	if (taskName) {
		const savedTasks = JSON.parse(localStorage.getItem('savedTasks')) || [];
		//alert(savedTasks);
		let id = savedTasks.length;
		let newTask = new Task(taskName, false);
		createTask(newTask, id);
		savedTasks.push(newTask);
		localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
	}
	else
		alert("You can't create empty task!");
}