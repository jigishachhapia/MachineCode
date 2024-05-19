const accordionContainer = document.querySelector(".accordionContainer");

const config = [
    {
        title: "accordion item 1",
        content: "Content of item 1"
    },
    {
        title: "accordion item 2",
        content: "Content of item 2"
    },
    {
        title: "accordion item 3",
        content: "Content of item 3"
    }
]

function renderAllAccordionItem() {

    config.forEach((accordionItem,index) => {
        const accItem = document.createElement("div");
        accItem.classList.add("accItem")
        const accItemHeader = document.createElement("div");
        accItemHeader.innerHTML = accordionItem.title;
        accItemHeader.classList.add("accHeader")

        const accItemContent = document.createElement("div");
        accItemContent.innerHTML = `<p>${accordionItem.content}</p>`;
        accItemContent.classList.add("accContent")
        accItem.appendChild(accItemHeader)
        accItem.appendChild(accItemContent)
        accordionContainer.appendChild(accItem)
        
        if(index===0) {
            accItemContent.classList.add("active");
            accItemContent.style.display="block";
        }else {
            accItemContent.style.display="none";
        }
    }) 
}

accordionContainer.addEventListener("click", function(e) {
    let clickedHeader = e.target.closest(".accHeader")
    if (!clickedHeader) return;

    const allItems = document.querySelectorAll(".accItem");

    const clickedItem = clickedHeader.parentNode;
    let isActive = clickedItem.querySelector(".active");

    allItems.forEach((item) => {
        let content = item.querySelector(".accContent")
        content.classList.remove("active");
        content.style.display= "none";
    })
   
    if(!isActive){
        let accItem = clickedHeader.parentNode;
        let activeContent = accItem.querySelector(".accContent");
        activeContent.classList.add("active");
        activeContent.style.display = "block";
    }   
})

renderAllAccordionItem();
