import addClickEvent from "./addClickEvent";
import createTodoItem from "./createTodoItem";
import displayForm from "./displayForm";
import Project from "./Project";
import TodoItem from "./TodoItem";

function createForm(textPlaceholder,buttonOneText,buttonTwoText){
    if(document.querySelector(".add-form" != null)){
        return document.querySelector(".add-form");
    }

    const addTodoItemContainer = document.querySelector(".add-todo-item");
    const addTodoItemButton = document.querySelector(".add-todo-item-text");

    const addItemForm = document.createElement("div");
    addItemForm.classList.add("add-form");

    const titleInput = document.createElement("input");
    titleInput.classList.add("title-text");
    titleInput.type = "text";
    titleInput.placeholder = textPlaceholder;
    
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const addButton = document.createElement("button");
    addButton.classList.add("add-button");
    addButton.textContent = buttonOneText;
    addButton.addEventListener("click", () => {
        if(addItemForm.parentElement.classList.contains("add-todo-item")){
            createTodoItem(titleInput.value);
            displayForm(addTodoItemContainer,addTodoItemButton,addItemForm);
            titleInput.value = '';
        }else{
            const project = new Project(titleInput.value);
            console.log(project);
        }
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = buttonTwoText;
    cancelButton.addEventListener("click", () => {
        if(addItemForm.parentElement.classList.contains("add-todo-item")){
            displayForm(addTodoItemContainer,addTodoItemButton,addItemForm);
            titleInput.value = '';
        }else{
            console.log("Cancel Project");
        }
    });

    buttonsContainer.appendChild(addButton);
    buttonsContainer.appendChild(cancelButton);

    addItemForm.appendChild(titleInput);
    addItemForm.appendChild(buttonsContainer);

    return addItemForm
}

export default createForm;