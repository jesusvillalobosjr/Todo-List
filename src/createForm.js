function createForm(textPlaceholder,buttonOneText,buttonTwoText){
    if(document.querySelector(".add-form" != null)){
        return document.querySelector(".add-form");
    }

    const addItemForm = document.createElement("div");
    addItemForm.classList.add("add-form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = textPlaceholder;
    
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const addButton = document.createElement("button");
    addButton.classList.add("add-button");
    addButton.textContent = buttonOneText;
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.textContent = buttonTwoText;

    buttonsContainer.appendChild(addButton);
    buttonsContainer.appendChild(cancelButton);

    addItemForm.appendChild(titleInput);
    addItemForm.appendChild(buttonsContainer);

    return addItemForm
}

export default createForm;