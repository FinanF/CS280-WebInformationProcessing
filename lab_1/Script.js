let time = document.getElementById("timer");
let pauseResume = document.getElementById("PRButton");
let counter = 1500.0;
let startButton = false;
let pauseButton = false;
let interval = null;

function started() {
    if (!startButton) {
        startButton = true;
        pauseButton = false;
        pauseResume.innerHTML = "Pause";
        interval = setInterval(() => {
            if (counter > 0 && startButton && !pauseButton) {
                counter -= 0.1;
                time.innerHTML = formatTime(counter);
            } else if (counter <= 0) {
                clearInterval(interval);
                time.innerHTML = "00:00";
                startButton = false;
                pauseResume.innerHTML = "Start";
            }
        }, 100);
    }
}

function stopped() {
    startButton = false;
    pauseButton = false;
    clearInterval(interval);
    interval = null;
    counter = 1500.0;
    time.innerHTML = formatTime(counter);
    pauseResume.innerHTML = "Start";
}

function paused() {
    if (startButton) {
        pauseButton = !pauseButton;
        pauseResume.innerHTML = pauseButton ? "Resume" : "Pause";
    }
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}