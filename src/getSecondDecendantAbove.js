function getSecondDecendantAbove(eventTarget){
    console.log(eventTarget);
    return eventTarget.parentElement.parentElement;
}

export default getSecondDecendantAbove;