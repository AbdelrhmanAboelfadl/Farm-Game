let eggs = $(".egg");
console.log(eggs);
let basket = $(".basketCon");
let halfBasketWidth = basket.outerWidth(true) / 2;
let brokenEggs = $(".borkenEgg img");
let LiveScore = 10;
let heighsetScore = 0;
let scoreBsket = 0;
let musicGame = $("#gameMusic")[0];
let musicLose = $("#loseMusic")[0];
let musicCollect = $("#CollectMusic")[0];
let musicPause = $("#PauseMusic")[0];
let switchGame = $("#switch-game");
let switchCollect = $("#switch-collect");
let switchLose = $("#switch-lose");
let isMusicPlaying = false;
let theGame;
// ================================
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
$("#Start .startCon").click(
    function () {
        $("#Start").fadeOut(1000, function () {
            restGame();
            startGame();
            musicGame.currentTime = 0;
            musicGame.play();
        })
    }
);
$(".fa-pause").click(function () {
    cancelAnimationFrame(theGame);
    musicGame.pause();
    musicPause.play();
    $("#Menu").fadeIn();
})
$("#Menu").click(function () {
    $("#Menu").fadeOut();
    musicGame.play();
    setTimeout(function () {
        startGame();
    }, 1000)
});
$("#Menu .box").click((e) => {
    e.stopPropagation();
});
$("#Menu .restart button").click(function () {
    $("#Menu").fadeOut();
    restGame();
    setTimeout(function () {
        musicGame.currentTime = 0;
        musicGame.play();
        startGame();
    }, 1000)
    
})
initSwitch(musicGame, switchGame, "musicGame");
initSwitch(musicCollect, switchCollect, "musicCollect");
initSwitch(musicLose, switchLose, "musicLose");