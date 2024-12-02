let countdownInterval; // Store interval ID to clear the timer

// Function to set the alarm based on the schedule time
function setAlarm() {
  const minutes = document.getElementById("schedule-time").value; // Get input time (in minutes)
  const bellSound = document.getElementById("bell-sound"); // Get the bell sound element
  
  // Calculate the time when the alarm will go off
  const now = new Date();
  const alarmTime = new Date(now.getTime() + minutes * 60 * 1000); // Add minutes to current time

  // Start the countdown
  startCountdown(alarmTime);
  
  // Set the timeout to play the bell sound after the set time
  setTimeout(() => {
    bellSound.play(); // Play the bell sound
    alert("Time's up! Task reminder."); // Alert after the bell rings
    clearInterval(countdownInterval); // Stop the countdown after alarm rings
  }, minutes * 60 * 1000); // Convert minutes to milliseconds
}

// Function to start and update the countdown timer
function startCountdown(alarmTime) {
  // Clear any existing countdown timer
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  // Update countdown every second
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = alarmTime - now; // Calculate time remaining in milliseconds

    // If time remaining is less than or equal to 0, stop the countdown
    if (timeRemaining <= 0) {
      document.getElementById("countdown-timer").textContent = "00:00";
      clearInterval(countdownInterval);
    } else {
      // Format the remaining time as MM:SS
      const minutes = Math.floor(timeRemaining / 1000 / 60).toString().padStart(2, '0');
      const seconds = Math.floor((timeRemaining / 1000) % 60).toString().padStart(2, '0');
      document.getElementById("countdown-timer").textContent = `${minutes}:${seconds}`;
    }
  }, 1000); // Update every second
}

// Function to adjust the volume of the bell sound
function setVolume() {
  const bellSound = document.getElementById("bell-sound");
  const volume = document.getElementById("volume-control").value; // Get the volume value from the slider
  bellSound.volume = volume; // Set the volume of the bell sound
}