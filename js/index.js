let imgPrefix = "src/images/image-";
let maxAngle = 20;
let imageIndex = 0;
let images = [imgPrefix + "0.jpg", imgPrefix + "1.jpg", imgPrefix + "2.jpg",
    imgPrefix + "3.jpg", imgPrefix + "4.jpg", imgPrefix + "5.jpg", imgPrefix + "6.jpg"];

let weekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday"];

let dateArr = ["One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen",
    "Nineteen", "Twenty", "Twenty-one", "Twenty-two", "Twenty-three", "Twenty-four",
    "Twenty-five", "Twenty-six", "Twenty-seven", "Twenty-eight", "Twenty-nine", "Thirty", "Thirty-one"];

let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

let canvas;
let context;

$(document).ready(function () {
    $("canvas.snow").let_it_snow();
    $("body").on("mousemove", function (e) {
        let centerX = document.body.offsetWidth / 2;
        let centerY = document.body.offsetHeight / 2;

        let deltaX = e.pageX - centerX;       // 水平移动距离
        let deltaY = e.pageY - centerY;       // 垂直移动距离

        let degX = deltaX / centerX * maxAngle;
        let degY = deltaY / centerY * maxAngle;

        $(".container").css({
            '-webkit-transform': 'rotateX(' + Math.round(-degY) + 'deg) rotateY(' + Math.round(degX) + 'deg)',
        });
    });
    canvas = document.getElementById("time");
    context = canvas.getContext("2d");
    window.setInterval(getTime, 1000);
});

function getTime() {
    let curDate = new Date();

    let hour = curDate.getHours().toString();
    let min = curDate.getMinutes().toString();
    let sec = curDate.getSeconds().toString();

    drawArc(hour, min, sec);

    if (hour.length < 2) {
        hour = 0 + hour;
    }
    if (min.length < 2) {
        min = 0 + min;
    }
    if (sec.length < 2) {
        sec = 0 + sec;
    }

    let month = curDate.getMonth();
    let date = curDate.getDate();
    $(".week").html(weekArr[curDate.getDay()]);
    $(".time").html(hour + ':' + min + ':' + sec);
    $(".date").html(monthArr[month] + " " + dateArr[date - 1]);
    $(".year").html(curDate.getFullYear());
}

function drawArc(hour, min, sec) {
    let endSec = sec === 0 ? 2 * Math.PI : sec / 60 * 2 * Math.PI;
    let endMin = min === 0 ? 2 * Math.PI : min / 60 * 2 * Math.PI;
    let endHour = hour === 0 ? 2 * Math.PI : hour / 24 * 2 * Math.PI;

    context.clearRect(0, 0, 600, 600);
    context.shadowBlur = 5;
    context.shadowColor = "deepskyblue";
    context.webkitImageSmoothingEnabled = true;
    context.webkitImageSmoothingQualtity = "high";
    // draw Sec
    context.beginPath();
    context.arc(300, 300, 280, 0, endSec, false);
    context.lineWidth = 3;
    context.strokeStyle = "#ffffff";
    context.stroke();
    context.closePath();
    // draw Min
    context.beginPath();
    context.arc(300, 300, 270, 0, endMin, false);
    context.lineWidth = 6;
    context.strokeStyle = "#ffffff";
    context.stroke();
    context.closePath();
    // draw Hour
    context.beginPath();
    context.arc(300, 300, 255, 0, endHour, false);
    context.lineWidth = 9;
    context.strokeStyle = "#ffffff";
    context.stroke();
    context.closePath();
}

function changeImage() {
    imageIndex++;
    if (imageIndex >= images.length)
        imageIndex = 0;

    $(".background").fadeOut(0.5, function () {
        $(".background").css("background-image", "url(" + images[imageIndex] + ")");
    });

    $(".background").fadeIn();
}

function toggleSnow() {
    $("canvas.snow").toggle();
    if ($("canvas.snow").is(':hidden')) {
        $("#snow-toggle").removeClass("snow-enabled");
        $("#snow-toggle").addClass("snow-disabled");
    } else {
        $("#snow-toggle").removeClass("snow-disabled");
        $("#snow-toggle").addClass("snow-enabled");
    }
}