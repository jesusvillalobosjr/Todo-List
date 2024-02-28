import {format,parseISO} from "date-fns"

function changeDate(container,date,item){
    function changeToInputDate(container,elementToChange){
        const datePicker = document.createElement("input");
        datePicker.classList.add("select-date");
        datePicker.type = "date";
        datePicker.min = format(new Date(),"yyyy-MM-dd");
        datePicker.addEventListener("change",() => changeItemDate(container,datePicker));
        container.replaceChild(datePicker,elementToChange);
    }
    
    function changeItemDate(container,elementToChange){
        const text = document.createElement("h3");
        text.classList.add("todo-item-date");
        item.changeDate(format(parseISO(elementToChange.value),"MM/dd/yyyy"));
        const date = format(parseISO(elementToChange.value),"MM/dd/yyyy");
        text.textContent = date;
        text.addEventListener("click",() => changeToInputDate(container,text));
        container.replaceChild(text,elementToChange);
    }   

    changeToInputDate(container,date);
}

export default changeDate;