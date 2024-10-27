let body = document.querySelector("body");
let sideBar = document.querySelector(".sideBar");
let menu = document.querySelector(".menu");
let moreInfo = document.querySelector(".more")

menu.addEventListener("click", function() {
    if(sideBar.style.display === "block") {
        sideBar.style.display = "none";
    } else {
        sideBar.style.display = "block";
    }
}); 