const config = [
    {
        id: "Home",
        title: "HOME PAGE",
        content : "This is home page"
    },
    {
        id: "Pricing",
        title: "Pricing PAGE",
        content : "This is pricing page"
    },
    {
        id: "About",
        title: "About PAGE",
        content : "This is about page"
    }
]
const tabListContainer = document.querySelector(".tabListContainer");
const tabContentContainer = document.querySelector(".tabContentContainer");


function createTabs() {
    console.log("create tabs")
    const listContainer = document.createElement("ul");
    
    listContainer.classList.add("tabList")
    config.forEach((tab,index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML=tab.id;
        if (index==0)
            listItem.classList.add("active")
        listItem.classList.add("tabItem")
        listItem.setAttribute("data-tabid", tab.id);
        listContainer.appendChild(listItem)
    })
    tabListContainer.appendChild(listContainer);
}

function createContent() {
    config.forEach((tab, index) => {
        const listItemContent = document.createElement("div");
        listItemContent.innerHTML = `<h1>${tab.title}</h1> <p>${tab.content}</p>`;
        listItemContent.classList.add("tabContent")
        listItemContent.setAttribute("data-tabcontentid",tab.id);
        if (index == 0)
            listItemContent.classList.add("active");
        tabContentContainer.appendChild(listItemContent)
    })

}
createTabs();
createContent();
const listContainer = document.querySelector(".tabList");

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        const activeTabId = e.target.dataset.tabid; 
        // when using dataset remove data- but when using getattribute set attribute use whole e.g. data-tabid

        const allTabContents = document.querySelectorAll("[data-tabcontentid]")
        allTabContents.forEach((tabContent) => {
            if(tabContent.dataset.tabcontentid === activeTabId)
                tabContent.classList.add("active");
            else
                tabContent.classList.remove("active");
        })

        const allTabIDs = document.querySelectorAll(".tabItem");
        allTabIDs.forEach((tabId) => {
            if(tabId.dataset.tabid === activeTabId) {
                tabId.classList.add("active");
            }else {
                tabId.classList.remove("active");
            }
        })

    }
})

