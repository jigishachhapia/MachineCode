const inputBox = document.querySelector(".autocomplete_input");
const ulList = document.querySelector(".suggestion_list");
const uiContainer = document.querySelector(".suggestion_list_container");
const autocompleteInput = document.querySelector(".autocomplete_input");
const icon = document.querySelector(".icon");
function displayFilteredData(filteredData) {
    if (!filteredData.length || !inputBox.value) {
        uiContainer.innerHTML = "";
        uiContainer.classList.remove("show");
        autocompleteInput.classList.remove("show");
        icon.classList.remove("show");
        return;
    }
    uiContainer.innerHTML = "";
    const ulEle = document.createElement("ul");
    ulEle.className ="suggestion_list";

    filteredData.forEach((item) => {
        const liEle = document.createElement("li");
        liEle.innerHTML = item.search;
        liEle.className = "suggestion_item";
        ulEle.appendChild(liEle);
    });
    console.log("ulElement", ulEle);
    
    uiContainer.appendChild(ulEle);
    autocompleteInput.classList.add("show");
    icon.classList.add("show");
    uiContainer.classList.add("show");
}
async function getFilteredData() {

        const res = await fetch("./data.json");
        const jsondata = await res.json();
        console.log("inputbox",inputBox.value)
        const filteredData = jsondata.filter((item)=> item.search.toLowerCase().includes(inputBox.value.toLowerCase()));
        console.log(filteredData,"filteredData")
        displayFilteredData(filteredData);
    }
inputBox.addEventListener("keyup", getFilteredData);