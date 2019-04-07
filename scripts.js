window.onload = function () {

    let currentTime;
    let inputTime;
    let stop = false;
    let audio = document.querySelector('.alarm');
    let displayTime = document.getElementById('display-time');
    let stopButton = document.querySelector('.stop');

    showTime();

    function showTime() {
        let hours;
        let mins;
        let secs;

        currentTime = new Date();
        hours = checkTime(currentTime.getHours());
        mins = checkTime(currentTime.getMinutes());
        secs = checkTime(currentTime.getSeconds());
        document.querySelector('.show-time').innerHTML = hours + ":" + mins + ":" + secs;
        checkAlarm();

        setTimeout(showTime, 500);
    }

    function play() {
        audio.play();
        stopButton.style.display = "block";
    }

    function pause() {
        audio.pause();
        audio.currentTime = 0;
        stopButton.style.display = "none";
        document.querySelector('.enter-hour').value = "";
        document.querySelector('.enter-min').value = "";
        displayTime.style.display = "none";
        stop = true;
    }

    document.querySelector('.stop').addEventListener('click', function () {
        pause();
    });

    function checkAlarm() {
        if (currentTime >= inputTime && !stop) {
            play();
        }
    }

    function checkTime(time) {
        if (time < 10) {
            time = "0" + time;
        }
        return time;
    }

    function getTime() {
        let hour = document.querySelector('.enter-hour').value;
        let min = document.querySelector('.enter-min').value;

        displayTime.innerText = "Alarm is set for " + hour + ":" + min;
        displayTime.style.display = "block";
        inputTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hour, min, 0, 0);
        if (currentTime > inputTime) {
            inputTime.setDate(inputTime.getDate() + 1);
        }
    }

    document.getElementById('set-alarm').addEventListener('click', getTime);
};