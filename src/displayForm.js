function displayForm(location,display,hide){
    if(!document.contains(display))
        location.appendChild(display);
    else
        display.style.display = "flex";
    hide.style.display = "none";
}

export default displayForm;