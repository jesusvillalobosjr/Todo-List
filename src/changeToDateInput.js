import {format,parseISO} from "date-fns"
import changeDateToText from "./changeDateToText";

function changeToDateInput(container,elementToChange,date= new Date()){
    const datePicker = document.createElement("input");
    datePicker.classList.add("select-date");
    datePicker.type = "date";
    datePicker.min = format(new Date(),"yyyy-MM-dd");
    datePicker.addEventListener("change",() => changeDateToText(container,datePicker));
    container.replaceChild(datePicker,elementToChange);
}

export default changeToDateInput;