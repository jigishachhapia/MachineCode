const barContainer = document.querySelector(".barRatingContainer");
const rating = document.querySelector(".centerRating");
const center = document.querySelector(".centerTotalCount")
const ratingStarsFilled= document.querySelector(".ratingStarsFilled");
const DATA = [ 
    {
        star: 5,
        count: 20500
    },
    {
        star: 4,
        count: 5500
    },{
        star: 3,
        count: 3500
    },
    {
        star: 2,
        count: 400
    },
    {
        star: 1,
        count: 500
    },  
];
const totalStar = 5;
let totalRating =0;
let avgTotal = 0; 
for(let i =0;i<DATA.length;i++){
    totalRating+=DATA[i].count;
    avgTotal += DATA[i].star * DATA[i].count;
}
for(let i =0 ;i<DATA.length;i++){
    let ele = `<div class="barRating"><span>${DATA[i].star}</span>
        <span class="ratingStar"></span>
        <span class="progress">
            <span class="bar" style="width: ${(DATA[i].count/totalRating) *100}%"></span>
        </span>
        <span class="count">${DATA[i].count.toLocaleString()}</span></div>`;
    barContainer.innerHTML+= ele;
}
let rate = (avgTotal/totalRating).toFixed(1);
console.log(rate,"rate")
rating.innerHTML = rate;
ratingStarsFilled.style.width=`${(rate/totalStar)*100}%`;
center.innerHTML = totalRating.toLocaleString();