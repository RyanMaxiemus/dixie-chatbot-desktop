document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  // Function to handle sending a message
  function sendMessage() {
    const message = input.value.trim();
    
    // If the message is not empty, display it and simulate a bot response
    if (message) {
      displayMessage(message, 'user');
      input.value = '';
      window.api.sendMessage(message);
    }
  }
  
  // Add an event listener to the send button to handle click events
  sendButton.addEventListener('click', sendMessage);

  // Add an event listener to the input field to handle Enter key events
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') sendMessage();
  });

  window.api.onReceiveMessage((message) => {
    displayMessage(message, 'bot');
  });

  // Function to display a message in the chat interface
  function displayMessage(message, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    
    // Auto scroll to the bottom of the messages
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});