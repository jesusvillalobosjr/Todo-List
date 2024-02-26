import Page from "./Page.js"
import createForm from "./createForm.js";
import displayForm from "./displayForm.js";
import loadPage from "./loadPage.js";

const current = new Page("Current");
const today = new Page("Today");
const thisWeek = new Page("This Week");

const currentButton = document.querySelector(".current");
const todayButton = document.querySelector(".today");
const thisWeekButton = document.querySelector(".this-week");
const addTodoItemContainer = document.querySelector(".add-todo-item");
const addTodoItemButton = document.querySelector(".add-todo-item-text");
const addProjectContainer = document.querySelector(".add-project-container");
const addProjectButton = document.querySelector(".add-project");
const addButton = document.querySelector(".add-button");
const todoItemTitleText = document.querySelector(".title-text");

currentButton.addEventListener("click",() => {
    loadPage(current);
});
todayButton.addEventListener("click",() => {
    loadPage(today);
});
thisWeekButton.addEventListener("click",() => {
    loadPage(thisWeek);
})

const addItemForm = createForm("Title","Add","Cancel");
addTodoItemButton.addEventListener("click",() => displayForm(addTodoItemContainer,addItemForm,addTodoItemButton));

const addProjectForm = createForm("Title","Add","Cancel");
addProjectButton.addEventListener("click",() => displayForm(addProjectContainer,addProjectForm,addProjectButton));