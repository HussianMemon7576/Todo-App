let input = document.querySelector("#inputBox");
let addbtn = document.querySelector("#addBtn");
let ul = document.querySelector(".todoList");

let value;
let editTodos = null;


function todovalidation() {
    value = input.value.trim();

    if (value === "") {
        alert("please add the todo");
        return;
    }

    if (value.length >= 30) {
        alert("maximum character reached");
        return;
    }


    if (editTodos !== null) {
        editTodos.querySelector("p").textContent = value;
        console.log(value);

        editTodos = null;
        addbtn.textContent = "Add";
        input.value = "";

        savetolocalstorage();
        return;
    }

    // 🔥 ADD MODE
    addtodo();
    savetolocalstorage();
    input.value = "";
}

function addtodo(todoValue = value) {
    let li = document.createElement("li");

    let contentDiv = document.createElement("div");
    contentDiv.classList.add("todo-content");

    let p = document.createElement("p");
    p.textContent = todoValue;

    // ✅ DATE
    let date = document.createElement("span");
    date.classList.add("date");
    date.textContent = new Date().toLocaleString();

    contentDiv.appendChild(p);
    contentDiv.appendChild(date);

    let edit = document.createElement("button");
    edit.classList.add("btn", "editBtn");
    edit.textContent = "Edit";

    let deletebtn = document.createElement("button");
    deletebtn.classList.add("btn", "deleteBtn");
    deletebtn.textContent = "Remove";

    li.appendChild(contentDiv);
    li.appendChild(edit);
    li.appendChild(deletebtn);

    ul.appendChild(li);
}

function savetolocalstorage() {
    let arr = [];

    document.querySelectorAll(".todoList li p").forEach((p) => {
        arr.push(p.textContent);
    });

    localStorage.setItem("todos", JSON.stringify(arr));
}


function loadTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(todo => {
        addtodo(todo);
    });
}

loadTodos();

function updatetodo(e) {

    // DELETE
    if (e.target.classList.contains("deleteBtn")) {
        let result = confirm("Do you want to delete this Todo!");

        if (result) {
            ul.removeChild(e.target.parentElement);
            savetolocalstorage();
        }
    }


    if (e.target.classList.contains("editBtn")) {
        let result = confirm("Do you want to edit this Todo?");

        if (!result) return;

        input.value = e.target.parentElement.querySelector("p").textContent;
        input.focus();

        editTodos = e.target.parentElement;
        addbtn.textContent = "Edit";
    }
}

addbtn.addEventListener("click", todovalidation);
ul.addEventListener("click", updatetodo);