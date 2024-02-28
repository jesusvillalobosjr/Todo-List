import {format,formatISO, parseISO} from "date-fns";
import changeToDateInput from "./changeToDateInput";

function changeDateToText(container,elementToChange){
    const text = document.createElement("h3");
    text.classList.add("todo-item-date");
    const date = format(parseISO(elementToChange.value),"MM/dd/yyyy");
    text.textContent = date;
    text.addEventListener("click",() => changeToDateInput(container,text));
    container.replaceChild(text,elementToChange);
}   

export default changeDateToText;