document.addEventListener('DOMContentLoaded', () => {
  // Add an event listener to the send button to handle click events
  document.getElementById('send-button').addEventListener('click', () => {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    // If the message is not empty, display it and simulate a bot response
    if (message) {
      displayMessage(message, 'user');
      input.value = '';
      
      setTimeout(() => {
        displayMessage(`Bot: ${message}`, 'bot');
      }, 500);
    }
  });

  // Function to display a message in the chat interface
  function displayMessage(message, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    
    // Set the class name of the message div based on the sender
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    
    // Auto scroll to the bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});