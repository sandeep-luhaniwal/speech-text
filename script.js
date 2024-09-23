// Check if the browser supports the Web Speech API
if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    alert('Sorry, your browser does not support the Web Speech API. Please use Google Chrome.');
  } else {
    const startButton = document.getElementById('start-button');
    const textOutput = document.getElementById('text-output');
  
    // Create a new instance of SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
  
    // Set recognition properties
    recognition.continuous = true;  // Keep listening until manually stopped
    recognition.interimResults = true;  // Show partial results in real-time
    recognition.lang = 'en-US';  // Set the language to English
  
    let isRecognitionActive = false;  // Track whether recognition is active
    let timeoutId = null;  // Timer ID for the 5-second delay
  
    // Handle the recognition result event
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      textOutput.value = transcript;  // Display the speech as text in the textarea
    };
  
    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      alert('Error occurred in speech recognition: ' + event.error);
    };
  
    // Function to start the speech recognition
    function startRecognition() {
      recognition.start();  // Start the recognition
      startButton.textContent = 'Stop Speech Recognition';
      isRecognitionActive = true;
    }
  
    // Function to stop the speech recognition
    function stopRecognition() {
      recognition.stop();  // Stop the recognition
      startButton.textContent = 'Start Speech Recognition';
      isRecognitionActive = false;
      clearTimeout(timeoutId);  // Clear the timeout if recognition stops manually
    }
  
    // Start/Stop recognition when the button is clicked
    startButton.addEventListener('click', () => {
      if (isRecognitionActive) {
        stopRecognition();  // Stop the recognition
      } else {
        startRecognition();  // Start the recognition
      }
    });
  
    // Handle the recognition end event (when the user stops speaking)
    recognition.onend = () => {
      if (isRecognitionActive) {
        // Start a 5-second timeout to wait for the user to resume speaking
        timeoutId = setTimeout(() => {
          stopRecognition();  // Stop recognition if no speech for 5 seconds
        }, 5000);  // 5 seconds
      }
    };
  
    // Handle the recognition start event (user resumes speaking within 5 seconds)
    recognition.onstart = () => {
      clearTimeout(timeoutId);  // Clear the timeout if the user starts speaking again
    };
  }
  