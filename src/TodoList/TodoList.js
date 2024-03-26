import { isToday,isAfter, lastDayOfWeek, endOfWeek } from "date-fns";
import Project from "./Project.js";

class TodoList{
    constructor(){
        this.projects = [];
        this.projects.push(new Project('Current',this.addItem));
        this.projects.push(new Project('Today',this.addItemToday));
        this.projects.push(new Project('This Week',this.addItemThisWeek));
    }

    addProject(projectName){
        this.projects.push(new Project(projectName,this.addItem));
    }

    getProject(projectName){
        return this.projects.find(project => project.name === projectName);
    }

    getProjects(){
        return this.projects;
    }

    setProjects(newProjects){
        this.projects = newProjects;
    }

    getNonDefaultProjects(){
        return this.projects.filter(project => !this.isDefaultProject(project.name));
    }

    containsProject(projectName){
        return this.projects.filter(project => project.name.toLowerCase() === projectName.toLowerCase()).length !== 0
    }

    removeProject(projectName){
        const project = this.getProject(projectName);
        const projectTodoItems = project.todoItems;
        this.projects = this.projects.filter((p) => p.name !== projectName);
        for(let p of this.projects){
            for(let todoItem of projectTodoItems){
                p.removeTodoItem(todoItem);
            }
        }
    }

    addTodoItem(item,activeProject){
        const projectsToAddTo = this.projects.filter(project => {
            if(activeProject === project.name || this.isDefaultProject(project.name))
                return true;

            return false;
        })

        for(let project of projectsToAddTo){
            project.addItemFunction(item);
        }
    }

    removeTodoItem(item){
        for(let project of this.projects){
            project.removeTodoItem(item);
        }
    }

    getTodoItem(itemName){
        const current = this.projects[0];
        for(let item of current.todoItems){
            if(item.name.toLowerCase() === itemName.toLowerCase())
                return item;
        }

        return null;
    }

    isDefaultProject(projectName){
        if(projectName.toLowerCase() === 'current'|| projectName.toLowerCase() === 'today' || projectName.toLowerCase() === 'this week')//
            return true;

        return false;
    }

    addItem(item){
        this.todoItems.push(item);
    }

    addItemToday(item){
        if(isToday(item.date)){
            this.todoItems.push(item);
        }
    }

    addItemThisWeek(item){
        if(!isAfter(item.date,lastDayOfWeek(item.date))){
            this.todoItems.push(item);
        }
    }

    verifyProjectsWithChangeOfDate(item){
        this.projects.forEach(project => {
            if(project.name === 'Today'){
                if(!isToday(item.date) && project.todoItems.includes(item)){
                    let index = project.todoItems.indexOf(item);
                    project.todoItems.splice(index,1);
                }
            }else if(project.name === 'This Week'){
                if(isAfter(item.date,endOfWeek(new Date())) && project.todoItems.includes(item)){
                    console.log("Here Bitch");
                    let index = project.todoItems.indexOf(item);
                    project.todoItems.splice(index,1);
                }
            }
        })
    }
}

export default TodoList;