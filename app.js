// Get the element for displaying messages
const messageDiv = document.getElementById('message');

// Array of days of the week
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get the element for displaying the result
const resultText = document.getElementById('result');

// Generate a random day of the week
let randomDay = daysOfTheWeek[Math.floor(Math.random() * 7) + 1];

// Speech recognition initialization
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = new window.SpeechRecognition();

// Start speech recognition
recog.start();

// Event listener to capture user's speech
recog.addEventListener('result', getUserSpeech);

// Restart speech recognition when it ends
recog.addEventListener('end', () => recog.start());

// Function to get user's speech
function getUserSpeech(e) {
    let message = e.results[0][0].transcript; // Get the user's speech
    showMessage(message); // Display the user's speech
}

// Function to display user's speech
function showMessage(message) {
    messageDiv.innerHTML = `<div> You said: ${message} </div>`; // Display the user's speech in the message div
    checkDaysOfTheWeek(message); // Check if the user's speech matches the random day
}

// Function to check the user's guess against the random day
function checkDaysOfTheWeek(message) {
    if (randomDay == message) {
        // Display the result as correct
        resultText.innerHTML = `<span style = "color: #00F700;"> Your guess is correct! </span> <br> <button id = "play-again-btn"> Play Again </button>`;
        // Stop speech recognition
        recog.addEventListener('end', () => recog.abort());
    } else {
        // Display the result as incorrect
        resultText.innerHTML = `<span style = "color: #F54A19;"> Oops! Your guess is incorrect! Try Again. </span>`;
    }
}

// Restart the guessing game when the "Play Again" button is clicked
document.body.addEventListener('click', (e) => {
    if (e.target.id == 'play-again-btn') window.location.reload(); // Reload the page to restart the game
});
