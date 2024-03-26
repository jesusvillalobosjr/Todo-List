import { format, isAfter, parseISO } from "date-fns";
import TodoItem from "./TodoItem.js"
import { log, sortBy } from "neo-async";

class UI{
    constructor(todoList){
        this.todoList = todoList;
    }

    loadHomePage(){
        this.loadAddForms();
        this.setAddButtons();
        this.loadProject(document.querySelector(".current"));
        this.loadProjects();
        this.addProjectEvents();
    }

    //Forms

    loadAddForms(){
        const addItemForm = this.generateAddForm("add-item-form","Title","Add","Cancel");
        addItemForm.style.display = "none";
        this.addItemFormEvents(addItemForm);
        const addTodoItemContainer = document.querySelector(".add-todo-item");
        addTodoItemContainer.appendChild(addItemForm);

        const addProjectForm = this.generateAddForm("add-project-form","Title","Add","Cancel");
        addProjectForm.style.display="none";
        this.addProjectFormEvents(addProjectForm);
        const addProjectContainer = document.querySelector(".add-project-container");
        addProjectContainer.appendChild(addProjectForm);
    }

    generateAddForm(className,inputPlaceholder,buttonOneText,buttonTwoText){
        if(document.querySelector(`.${className}`) != null){
            return document.querySelector(`.${className}`);
        }
    
        const form = document.createElement("div");
        form.classList.add(`${className}`);
        form.classList.add('add-form');
    
        const input = document.createElement("input");
        input.classList.add("title-text");
        input.type = "text";
        input.placeholder = inputPlaceholder;
        
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");
    
        const addButton = document.createElement("button");
        addButton.classList.add("add-button");
        addButton.textContent = buttonOneText;
    
        const cancelButton = document.createElement("button");
        cancelButton.classList.add("cancel-button");
        cancelButton.textContent = buttonTwoText;
    
        buttonsContainer.appendChild(addButton);
        buttonsContainer.appendChild(cancelButton);
    
        form.appendChild(input);
        form.appendChild(buttonsContainer);
    
        return form;
    }

    //Event functions

    addProjectFormEvents(form){
        const [textInput,buttonsContainer] = form.childNodes;
        const [addButton,cancelButton] = buttonsContainer.childNodes;
        addButton.addEventListener("click",() => this.handleAddProject(textInput));
        cancelButton.addEventListener("click",() => this.swapProjectFormToButton());
    }

    addItemFormEvents(form){
        const [textInput,buttonsContainer] = form.childNodes;
        const [addButton,cancelButton] = buttonsContainer.childNodes;
        addButton.addEventListener("click",() => this.handleAddItem(textInput));
        cancelButton.addEventListener("click",() => this.swapItemFormToButton());
    }

    addProjectEvents(){
        const current = document.querySelector(".current");
        const today = document.querySelector(".today");
        const thisWeek = document.querySelector(".this-week");

        const userProjects = document.querySelectorAll(".user-project");

        const projects = (userProjects != null) ? [current,today,thisWeek,...userProjects] : [current,today,thisWeek];
        projects.forEach((project) => project.addEventListener("click",(e) => this.loadProject(e.target))); //
        userProjects.forEach((project) => project.addEventListener('mouseover',() => this.showProjectDelete(this.getProjectDeleteButton(project))));
        userProjects.forEach((project) => project.addEventListener('mouseout',() => this.hideProjectDelete(this.getProjectDeleteButton(project))));
    }

    addItemEvents(){//
        const allItems = document.querySelectorAll(".todo-item");
        allItems.forEach(item => this.getCloseFromTodoItem(item).addEventListener("click",(e) => this.deleteTodoItem(e.currentTarget)));
        allItems.forEach(item => this.getDateFromTodoItem(item).addEventListener("click",(e) => this.changeDateTextToDatePicker(e.currentTarget)));
    }

    addProjectCloseButtonEvents(closeButton){
        closeButton.addEventListener("click",(e) => this.deleteProject(e.currentTarget));
    }

    // Handlers

    handleAddProject(input){
        if(this.addProjectHasError(input)) return;

        this.addProject(input.value);
        this.addProjectEvents();
        this.clearInput(input);
        this.swapProjectFormToButton();
        localStorage.setItem('todoList',JSON.stringify(this.todoList));
    }

    handleAddItem(input){
        if(this.addItemHasError(input)) return;

        this.addTodoItem(input.value);
        this.clearInput(input);
        this.swapItemFormToButton();
        this.loadActiveProject();
        localStorage.setItem('todoList',JSON.stringify(this.todoList));
    }

    //Button to show forms and swap functions.

    setAddButtons(){
        const addItemButton = document.querySelector(".add-todo-item-text");
        addItemButton.addEventListener("click", () => this.swapItemButtonToForm());

        const addProjectButton = document.querySelector(".add-project");
        addProjectButton.addEventListener("click",() => this.swapProjectButtonToForm());
    }

    swapItemButtonToForm(){
        this.showAddItemForm();
        this.hideAddItemButton();
    }

    swapProjectButtonToForm(){
        this.showAddProjectForm();
        this.hideAddProjectButton();
    }

    swapItemFormToButton(){
        this.showAddItemButton();
        this.hideAddItemForm();
    }

    swapProjectFormToButton(){
        this.showAddProjectButton();
        this.hideAddProjectForm();
    }

    showAddItemForm(){
        const addItemForm = document.querySelector(".add-item-form");
        addItemForm.style.display = "flex";
    }

    showAddProjectForm(){
        const addProjectForm = document.querySelector(".add-project-form");
        addProjectForm.style.display = "flex";
    }

    showAddItemButton(){
        const button = document.querySelector(".add-todo-item-text");
        button.style.display = "flex";
    }

    showAddProjectButton(){
        const button = document.querySelector(".add-project");
        button.style.display = "flex";
    }

    hideAddItemButton(){
        const button = document.querySelector(".add-todo-item-text");
        button.style.display = "none";
    }

    hideAddProjectButton(){
        const button = document.querySelector(".add-project");
        button.style.display = "none";
    }

    hideAddItemForm(){
        const addItemForm = document.querySelector(".add-item-form");
        addItemForm.style.display = "none";
    }

    hideAddProjectForm(){
        const addProjectForm = document.querySelector(".add-project-form");
        addProjectForm.style.display = "none";
    }

    //Project

    loadProject(projectButton){
        let project = projectButton;
        if(projectButton.classList.contains('close'))
            return;
        else if(projectButton.nodeName === 'SPAN' || projectButton.nodeName === 'P'){
            project = (projectButton.nodeName === 'SPAN') ? this.getProjectElementFromSpan(project) : this.getProjectElementFromP(project);
        }

        const activeProject = document.querySelector(".active-project");
        if(activeProject !== null){
            activeProject.classList.remove("active-project");
        }
        const projectTitle = document.querySelector(".current-page-title");
        const projectName = this.getProjectName(project);
        projectTitle.textContent = projectName;
        projectButton.classList.add('active-project');

        this.loadTodoItemElements(projectName);
        this.addItemEvents();
    }

    loadProjects(){
        const nonDefaultProjects = this.todoList.getNonDefaultProjects();
        const projectContainer = document.querySelector('.projects-list');
        for(let project of nonDefaultProjects){
            const projectElement = this.createProjectElement(project.name);
            projectContainer.appendChild(projectElement);
        }
    }

    loadActiveProject(){
        const activeProject = document.querySelector(".active-project");
        this.loadProject(activeProject);
    }

    getProjectName(projectContainer){
        return projectContainer.childNodes[0].childNodes[1].data.trimStart();
    }

    addProject(projectName){
        this.todoList.addProject(projectName);

        const projectContainer = document.querySelector('.projects-list');
        const projectElement = this.createProjectElement(projectName);
        projectContainer.appendChild(projectElement);

        this.addProjectEvents();
    }

    addProjectHasError(input){
        if(input.value === ''){
            alert('Project name must be added.');
            return true;
        }else if(this.todoList.containsProject(input.value)){
            alert('Project name must be different from all projects.');
            return true;
        }
    }

    createProjectElement(projectName){
        const sideBarContainer = document.createElement('div');
        sideBarContainer.classList.add(`sidebar-container`,`${this.formatClass(projectName)}`,'user-project');
        const sideBarText = document.createElement('p');
        sideBarText.innerHTML = `<span class="material-symbols-outlined">checklist</span> ${projectName}`;
        const sideBarDeleteProject = document.createElement('span');
        sideBarDeleteProject.classList.add('material-symbols-outlined','close');
        sideBarDeleteProject.textContent = "close";
        sideBarDeleteProject.style.display = "none";
        this.addProjectCloseButtonEvents(sideBarDeleteProject);

        sideBarContainer.appendChild(sideBarText);
        sideBarContainer.appendChild(sideBarDeleteProject);

        return sideBarContainer;
    }

    sortProjectItemsByDate(projectItems){
        const sorted = projectItems.sort((a,b) => {
            if(isAfter(a.date,b.date))
                return 1;
            else return -1;
        })

        return sorted;
    }   

    getProjectElementFromP(p){
        return p.parentNode;
    }

    getProjectElementFromSpan(span){
        return span.parentNode.parentNode;
    }

    getProjectElementFromClose(close){
        return close.parentNode;
    }

    getProjectDeleteButton(project){
        return project.childNodes[1];
    }

    showProjectDelete(closeButton){
        closeButton.style.display = 'block';
    }

    hideProjectDelete(closeButton){
        closeButton.style.display = 'none';
    }

    deleteProject(closeButton){
        this.deleteProjectFromContainer(closeButton);
        this.deleteProjectFromTodoList(closeButton);
        const mainPage = document.querySelector(".current");
        this.loadProject(mainPage);
        localStorage.setItem('todoList',JSON.stringify(this.todoList));
    }

    deleteProjectFromContainer(closeButton){
        const projectContainer = document.querySelector('.projects-list');
        const projectElement = this.getProjectElementFromClose(closeButton);
        projectContainer.removeChild(projectElement);
    }

    deleteProjectFromTodoList(closeButton){
        const projectElement = this.getProjectElementFromClose(closeButton);
        const projectName = this.getProjectName(projectElement);
        this.todoList.removeProject(projectName);
    }

    // Todo Item

    addTodoItem(itemName){
        const todoItem = new TodoItem(itemName,new Date());
        
        let activeProject = document.querySelector(".active-project");
        activeProject = this.getProjectName(activeProject);
        this.todoList.addTodoItem(todoItem,activeProject);
    }

    createTodoItem(item){
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
    
        const todoItemLeft = document.createElement("div");
        todoItemLeft.classList.add("todo-item-left");
        const todoItemTitle  = document.createElement("h3");
        todoItemTitle.classList.add("todo-item-title");
        todoItemTitle.textContent = item.name;
        todoItemLeft.appendChild(todoItemTitle);
    
        const todoItemRight = document.createElement("div");
        todoItemRight.classList.add("todo-item-right");
        const todoItemDateContainer = document.createElement("div");
        todoItemDateContainer.classList.add("todo-item-date-container");
        const todoItemDate = document.createElement("h3");
        todoItemDate.classList.add("todo-item-date");
        todoItemDate.textContent = format(item.date,"MM/dd/yyyy");
        todoItemDateContainer.appendChild(todoItemDate);
        todoItemRight.appendChild(todoItemDateContainer);
        const todoItemClose = document.createElement("div");
        todoItemClose.classList.add("todo-item-delete");
        todoItemClose.innerHTML = '<span class="material-symbols-outlined">close</span>';
        todoItemRight.appendChild(todoItemClose);
    
        todoItem.appendChild(todoItemLeft);
        todoItem.appendChild(todoItemRight);
    
        return todoItem;
    }

    loadTodoItemElements(projectName){
        const todoItemsContainer = document.querySelector(".todo-items");
        todoItemsContainer.innerHTML = '';

        const project = this.todoList.getProject(projectName);
        const projectTodoItems = this.sortProjectItemsByDate(project.todoItems);
        for(let item of projectTodoItems){
            todoItemsContainer.appendChild(this.createTodoItem(item));
        }
    }

    addItemHasError(input){
        if(input.value === ''){
            alert('Item name must be added.');
            return true;
        }else if(this.todoList.getTodoItem(input.value)){//
            alert('Todo Item name must be different from all other Todo Items.');
            return true;
        }
    }

    deleteTodoItem(close){
        let item = this.getTodoItemFromClose(close);
        item = this.getNameFromTodoItem(item);
        item = this.todoList.getTodoItem(item);

        this.todoList.removeTodoItem(item);
        this.loadActiveProject();
        localStorage.setItem('todoList',JSON.stringify(this.todoList));
    }

    changeDateTextToDatePicker(date){
        const dateContainer = this.getDateContainerFromDate(date);
        const datePicker = this.createDatePicker();
        datePicker.addEventListener('change',(e) => this.changeTodoItemDate(e.currentTarget));
        dateContainer.replaceChild(datePicker,date);
    }

    changeTodoItemDate(datePicker){
        const date = new Date(parseISO(datePicker.value));
        const todoItem = this.getTodoItemFromDate(datePicker);
        const todoItemName = this.getNameFromTodoItem(todoItem);
        const itemObj = this.todoList.getTodoItem(todoItemName);
        itemObj.changeDate(date);
        this.todoList.verifyProjectsWithChangeOfDate(itemObj);
        this.loadActiveProject();
        localStorage.setItem('todoList',JSON.stringify(this.todoList));
    }

    createDatePicker(){
        const datePicker = document.createElement('input');
        datePicker.type = 'date';
        datePicker.classList.add('date-picker');
        datePicker.min = format(new Date(),"yyyy-MM-dd");
        return datePicker;
    }

    getCloseFromTodoItem(todoItem){
        return todoItem.childNodes[1].childNodes[1].childNodes[0];
    }

    getDateFromTodoItem(todoItem){
        return todoItem.childNodes[1].childNodes[0].childNodes[0];
    }

    getDateContainerFromDate(date){
        return date.parentNode;
    }

    getTodoItemFromClose(close){
        return close.parentNode.parentNode.parentNode;
    }

    getTodoItemFromDate(date){
        return date.parentNode.parentNode.parentNode;
    }

    getNameFromTodoItem(todoItem){
        return todoItem.childNodes[0].childNodes[0].textContent;
    }

    //Helper Methods

    formatClass(string){
        return string.toLowerCase().replace(' ','-');
    }

    clearInput(input){
        input.value = '';
    }
}

export default UI;