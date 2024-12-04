let isAlarmRunning = false;
let intervalID;
let currentAudio;
let classBell = "bell1.mp3"; 
let breakBell = "bell1.mp3";
let classDuration = 40; // Default class duration (minutes)
let breakDuration = 15; // Default break duration (minutes)
let countdownID;

function startAlarm() {
    console.log("Set Alarm clicked"); // Debug log to check if the function is triggered
    if (isAlarmRunning) return; // Prevent starting if already running

    isAlarmRunning = true;

    // Get selected values from the input fields
    classBell = document.getElementById("classBell").value;
    breakBell = document.getElementById("breakBell").value;
    classDuration = parseInt(document.getElementById("classTime").value);
    breakDuration = parseInt(document.getElementById("breakTime").value);

    console.log(`Class Bell: ${classBell}, Break Bell: ${breakBell}, Class Duration: ${classDuration}, Break Duration: ${breakDuration}`);

    // Start with class bell sound immediately
    playBellSound(classBell);
    updateStatus("Class", classDuration); // Show "Class" status initially
    cycleAlarm(); // Start the alarm cycle

    // Hide the "Set Alarm" button after the alarm is set and show the "Stop Alarm" button
    document.getElementById("startAlarm").style.display = "none"; 
    document.getElementById("stopAlarm").style.display = "inline-block"; 
    document.getElementById("stopSound").style.display = "inline-block"; // Show "Stop Sound" button
}
function playBellSound(bell) {
    console.log(`Playing sound: ${bell}`);
    if (currentAudio) {
        currentAudio.pause(); // Pause any currently playing sound
    }

    currentAudio = new Audio("https://raw.githubusercontent.com/gigiOHYA/TaskBell/main/sounds/" + bell);
    currentAudio.play();
}

function cycleAlarm() {
    let isClassTime = true;

    const switchBell = () => {
        let duration = isClassTime ? classDuration : breakDuration;
        updateStatus(isClassTime ? "上課中" : "下課中", duration);
        playBellSound(isClassTime ? classBell : breakBell);
        startCountdown(duration * 60); // 重置倒數計時
        isClassTime = !isClassTime; // 下次進行切換
    };

    switchBell(); // 立即進行首次狀態更新和鈴聲播放
    intervalID = setInterval(switchBell, classDuration * 60 * 1000 + breakDuration * 60 * 1000);
}

function startCountdown(seconds) {
    clearInterval(countdownID); // 清除之前的倒數計時器

    countdownID = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(countdownID); // 停止倒數計時
        } else {
            seconds--;
            let mins = Math.floor(seconds / 60);
            let secs = seconds % 60;
            document.getElementById("nextBellTime").innerText = `下一次鐘聲在: ${mins}:${secs < 10 ? '0' + secs : secs}`;
        }
    }, 1000);
}



function updateStatus(status, duration) {
    document.getElementById("currentStatus").innerText = status;
    document.getElementById("nextBellTime").innerText = `下一次鐘聲在: ${duration}:00`;
}

function stopAlarm() {
    // Stop the alarm and clear the interval
    clearInterval(intervalID);
    isAlarmRunning = false;
    document.getElementById("startAlarm").style.display = "inline-block"; // Show "Set Alarm" button again
    document.getElementById("stopAlarm").style.display = "none"; // Hide "Stop Alarm" button
    document.getElementById("stopSound").style.display = "none"; // Hide "Stop Sound" button
    if (currentAudio) {
        currentAudio.pause(); // Stop the current sound
        currentAudio = null;
    }
    updateStatus("無設定", 0); // Update the status to "Stopped"
}

function stopSound() {
    // Stop the current sound immediately when the "Stop Sound" button is clicked
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
}
