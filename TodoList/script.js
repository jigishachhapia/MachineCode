document.addEventListener("DOMContentLoaded",function () {
    const todoInput = document.querySelector(".todoTextInput")
    const todoList = document.querySelector(".todoList")
    const submitBtn = document.querySelector(".submitBtn")
    const form = document.getElementById("formInput")
     let editMode = false;
     let  editText = null;
     let editedItem = null;
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const item = todoInput.value.trim();
        if (item.value !== "") {
            if (!editMode){
                createAddTodoItem();
                todoInput.value=""
            } else {
                editedItem.firstChild.innerText = todoInput.value;                
                editMode = false;
                editText = null;
                editedItem = null;
                todoInput.value = ""
                submitBtn.innerText = "Add item"
            }            
        }
    })
    todoList.addEventListener("click",(e)=> {
        const target = e.target;
        if (target.tagName === "BUTTON") {
            if (target.innerText == "❌") {
                target.parentNode.remove()
            } else {
                const todoItem = target.parentNode;
                editMode = true;
                editedItem = todoItem;
                console.log(todoItem.firstChild.innerText);
                todoInput.value = todoItem.firstChild.textContent;
                submitBtn.innerText = "Edit Item"
                todoInput.focus();
            }
        }

    })
    function createAddTodoItem() {
        const todoItem = document.createElement("li");
        const editBtn = document.createElement("button")
        const removeBtn = document.createElement("button")
        todoItem.innerHTML = `<span>${todoInput.value}</span>`;
        removeBtn.innerText = "❌";
        editBtn.innerText = "📝";
        todoItem.appendChild(editBtn)
        todoItem.appendChild(removeBtn)
        todoList.appendChild(todoItem);
    }


})