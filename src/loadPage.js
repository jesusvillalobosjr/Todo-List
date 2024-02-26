function loadPage(page){
    const currentPageTitle = document.querySelector(".current-page-title");
    currentPageTitle.textContent = page.title;
}

export default loadPage;