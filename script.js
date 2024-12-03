let isAlarmRunning = false;
let intervalID;
let currentAudio;
let classBell = "bell1.mp3"; 
let breakBell = "bell1.mp3";
let classDuration = 40; // Default class duration (minutes)
let breakDuration = 15; // Default break duration (minutes)

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
    currentAudio = new Audio(`/sounds/${bell}`);
    currentAudio.play();
}

function cycleAlarm() {
    let isClassTime = true; // Start with class time

    intervalID = setInterval(() => {
        let duration = isClassTime ? classDuration : breakDuration;
        startCountdown(duration * 60); // Start countdown (in seconds)

        // Toggle between class and break time
        isClassTime = !isClassTime;

        // Play the corresponding bell sound
        playBellSound(isClassTime ? classBell : breakBell);

        // Update the status (Class or Break) and the time remaining
        updateStatus(isClassTime ? "Class" : "Break", duration);
    }, (classDuration + breakDuration) * 60 * 1000); // Cycle every class + break duration
}

function startCountdown(seconds) {
    let countdown = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(countdown); // Stop the countdown when time is up
        } else {
            seconds--;
            let mins = Math.floor(seconds / 60);
            let secs = seconds % 60;
            document.getElementById("nextBellTime").innerText = `${mins}:${secs < 10 ? '0' + secs : secs}`;
        }
    }, 1000);
}

function updateStatus(status, duration) {
    // Update the current status (Class or Break) and the time remaining for the next bell
    document.getElementById("currentStatus").innerText = `Currently: ${status}`;
    document.getElementById("nextBellTime").innerText = `Next bell in: ${duration}:00`;
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
    updateStatus("Stopped", 0); // Update the status to "Stopped"
}

function stopSound() {
    // Stop the current sound immediately when the "Stop Sound" button is clicked
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
}
