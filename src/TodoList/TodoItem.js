class TodoItem{
    constructor(name,date){
        this.name = name;
        this.date = date;
    }

    changeDate(newDate){
        this.date = newDate;
    }
}

export default TodoItem;