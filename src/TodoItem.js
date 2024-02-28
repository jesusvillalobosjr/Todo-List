class TodoItem{
    constructor(title,date){
        this.title = title;
        this.date = `${date}`;
    }

    changeDate(newDate){
        this.date = newDate;
    }
}

export default TodoItem;