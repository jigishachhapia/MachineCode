let ratingContainer = document.getElementsByClassName("rating");
let stars = document.getElementsByClassName("star");
let lastRating = 0;
let totalStar = 5;
console.log(ratingContainer)
ratingContainer[0].addEventListener("click", function (e) {
        setClasses(e);
        lastRating = e.target.dataset.index;
})

function setClasses(e) {
    let rate = e.target.dataset.index;
    for(let i=0;i<totalStar;i++){
       stars[i].classList.remove("filled");
    }
    for(let i=0;i<rate;i++){
        stars[i].classList.add("filled");
    }
}
ratingContainer[0].addEventListener("mouseover", function(e) {
    setClasses(e);
})
ratingContainer[0].addEventListener("mouseleave", function(e){
    for(let i=0;i<totalStar;i++){
       stars[i].classList.remove("filled");
    }
    for(let i=0;i<lastRating;i++){
        stars[i].classList.add("filled");
    }
})