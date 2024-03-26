import Project from "./Project";
import TodoItem from "./TodoItem";
import TodoList from "./TodoList";

class LocalStorage{
    static getTodoList(){
        const items = {};

        const todoList = new TodoList();
        Object.assign(todoList,JSON.parse(localStorage.getItem('todoList')));

        todoList.setProjects(todoList.getProjects().map(project => {
            if(project.name.toLowerCase() === 'today')
                return Object.assign(new Project(project.name,todoList.addItemToday),project);
            else if(project.name.toLowerCase() === 'this week')
                return Object.assign(new Project(project.name,todoList.addItemThisWeek),project);
            else
                return Object.assign(new Project(project.name,todoList.addItem),project);
        }));

        todoList.getProjects().forEach(project => project.setItems(
            project.getItems().map(item => {
                if(items[item.name] === undefined){
                    const itemObj = Object.assign(new TodoItem(item.name,new Date(item.date),item));
                    items[item.name] = itemObj;
                }
                return items[item.name];
            })
        ));

        return todoList;
    }
}

export default LocalStorage;