import LocalStorage from "./TodoList/LocalStorage.js";
import UI from "./TodoList/UI.js";

const todoList = LocalStorage.getTodoList();
const userInterface = new UI(todoList);
userInterface.loadHomePage();