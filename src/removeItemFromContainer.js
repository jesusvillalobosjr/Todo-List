function removeItemFromContainer(container,eventTarget){
    console.log(eventTarget);
    container.removeChild(eventTarget);
}

export default removeItemFromContainer;