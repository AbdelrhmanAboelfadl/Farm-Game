function startGame() {
    moveEgg(eggs[0], (Math.random() * 10 + 1));
    moveEgg(eggs[1], (Math.random() * 10 + 1));
    moveEgg(eggs[2], (Math.random() * 10 + 1));
    isEggInBasket(eggs[0]);
    isEggInBasket(eggs[1]);
    isEggInBasket(eggs[2]);
    theGame = requestAnimationFrame(startGame);
    if (LiveScore <= 0) {
        cancelAnimationFrame(theGame);
        $("#Start .startCon h5").text("Game Over -_- Try Again");
        $(".shapeCon .shapes").css({
            "color":"red" 
        });
        musicGame.pause();
        musicLose.play();
        $("#Start").fadeIn(500);
        if (heighsetScore > localStorage.getItem("heighsetScore")) {
            heighsetScore = score;
            localStorage.setItem("heighsetScore", heighsetScore);
            $("#hScore").text(heighsetScore);
        }
    }
};
function moveEgg(egg,speed) {
    let topOfEgg = $(egg).offset().top;
    let distanceMove = Math.random() * speed;
    let bottomOfBasket = basket.offset().top + basket.outerHeight(true);
    let indexOfEgg = eggs.index(egg);

    if (topOfEgg <= bottomOfBasket) {
        $(egg).offset({
        top: topOfEgg + distanceMove
    })
    } else {
        if (LiveScore > 0) {
        restEgg(egg);
        let brokenEgg = brokenEggs.eq(indexOfEgg);
        brokenEgg.addClass("show"); 
        setTimeout(() => {
        brokenEgg.removeClass("show");
        }, 500);
        $("#lScore").text(--LiveScore);
        }
        
    }
    
}
function restEgg(egg) {
    $(egg).offset({
        top: 200
    });
}
function restGame() {
    eggs.each(function (index,egg) {
        restEgg(egg);
    })
    LiveScore = 10;
    score = 0;
    scoreBsket = 0;
    $("#lScore").text(LiveScore);
    $(".score").text(score);
    $(".ScoreBasket").text(scoreBsket);
}
function isEggInBasket(egg) {
    if (drop(egg,basket)) {
        $(".score").text(++score);
        $("#ScoreBasket").text(++scoreBsket);
        restEgg(egg);
        if (score > heighsetScore) {
            $("#hScore").text(++heighsetScore);

        }
    }
}
function drop(item1, item2) {
    let t1 = $(item1).offset().top;
    let l1 = $(item1).offset().left;
    let b1 = t1 + $(item1).outerHeight(true);
    let r1 = l1 + $(item1).outerWidth(true);
    let t2 = $(item2).offset().top;
    let l2 = $(item2).offset().left;
    let b2 = t2 + $(item2).outerHeight(true);
    let r2 = l2 + $(item2).outerWidth(true);
    if (b2 < t1 || l2 > r1 || t2>b1 || r2<l1) {
        return false;
    } else {
        musicCollect.currentTime = 0;
        musicCollect.play();
        return true;
    }
}
function updateHsore() {
    heighsetScore = localStorage.getItem("heighsetScore");
    $("#hScore").text(heighsetScore);
}
function moveBasket(xPosition) {
    if (xPosition >= halfBasketWidth && xPosition <= ($(window).outerWidth(true) - halfBasketWidth)) {
        basket.offset({
            left: xPosition - halfBasketWidth
        });
    }
}
function initSwitch(audio, checkbox, key) {
    let stored = localStorage.getItem(key);
    if (stored === null) {
        checkbox.prop("checked", true);
        audio.muted = false;
    } else {
        checkbox.prop("checked", stored === "true" ? true : false);
        audio.muted = stored === "true" ? false : true;
    }

    checkbox.on("change", function () {
        if ($(this).is(":checked")) {
            audio.muted = false;
            localStorage.setItem(key, "true");
        } else {
            audio.muted = true;
            localStorage.setItem(key, "false");
        }
    });
}
