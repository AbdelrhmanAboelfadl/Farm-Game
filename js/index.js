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
    if (e.pageX >= halfBasketWidth && e.pageX <= ($(window).outerWidth(true) - halfBasketWidth)) {
        basket.offset({
        left: e.pageX - halfBasketWidth
    });
    }
});
$("#Start").click(
    function () {
        $("#Start").fadeOut(1000, function () {
            restGame();
            startGame();
        })
    }
);