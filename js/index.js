let eggs = $(".egg");
console.log(eggs);
let basket = $(".basketCon");
let halfBasketWidth = basket.outerWidth(true) / 2;
let brokenEggs = $(".borkenEgg img");
let LiveScore = 10;
let heighsetScore = 0;
let scoreBsket = 0;
if (localStorage.getItem("heighsetScore")== null) {
    localStorage.setItem("heighsetScore", heighsetScore);
    $("#hScore").text(heighsetScore);
} else {
     updateHsore();
}
console.log(brokenEggs);
$(window).mousemove(function (e) { 
    moveBasket(e.pageX);
});
$(window).on("touchmove", function (e) {
    let touch = e.originalEvent.touches[0];
    moveBasket(touch.pageX);
});
$("#Start").click(
    function () {
        $("#Start").fadeOut(1000, function () {
            restGame();
            startGame();
        })
    }
);