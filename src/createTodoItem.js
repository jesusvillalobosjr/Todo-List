import TodoItem from "./TodoItem";
import{format} from "date-fns"
import changeDate from "./changeDate";

function createTodoItem(itemTitle){
    const item = new TodoItem(itemTitle,format(new Date(),"MM/dd/yyyy"));
    const todoItems = document.querySelector(".todo-items");

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const todoItemLeft = document.createElement("div");
    todoItemLeft.classList.add("todo-item-left");
    const todoItemCheck = document.createElement("div");
    todoItemCheck.classList.add("todo-item-check");
    todoItemLeft.appendChild(todoItemCheck);
    const todoItemTitle  = document.createElement("h3");
    todoItemTitle.classList.add("todo-item-title");
    todoItemTitle.textContent = item.title;
    todoItemLeft.appendChild(todoItemTitle);

    const todoItemRight = document.createElement("div");
    todoItemRight.classList.add("todo-item-right");
    const todoItemDateContainer = document.createElement("div");
    todoItemDateContainer.classList.add("todo-item-date-container");
    const todoItemDate = document.createElement("h3");
    todoItemDate.classList.add("todo-item-date");
    todoItemDate.textContent = item.date;
    todoItemDate.addEventListener("click",() => changeDate(todoItemDateContainer,todoItemDate,item));
    todoItemDateContainer.appendChild(todoItemDate);
    todoItemRight.appendChild(todoItemDateContainer);
    const todoItemClose = document.createElement("div");
    todoItemClose.classList.add("todo-item-delete");
    todoItemClose.innerHTML = '<span class="material-symbols-outlined">close</span>';
    todoItemRight.appendChild(todoItemClose);

    todoItem.appendChild(todoItemLeft);
    todoItem.appendChild(todoItemRight);

    todoItems.appendChild(todoItem);
}

export default createTodoItem;