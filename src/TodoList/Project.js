class Project{
    constructor(name,addItemFunction=null) {
        this.name = name;
        this.todoItems = [];
        this.addItemFunction = addItemFunction;
    }

    removeTodoItem(item){
        this.todoItems = this.todoItems.filter(todoItem => todoItem !== item);
    }

    getItems(){
        return this.todoItems;
    }

    setItems(newItems){
        this.todoItems = newItems;
    }
}

export default Project;