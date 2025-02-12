document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  // Function to handle sending a message
  const sendMessage = () => {
    const message = input.value.trim();
    
    // If the message is not empty, display it and simulate a bot response
    if (message) {
      displayMessage(message, 'user');
      input.value = '';
      adjustTextareaHeight(); // Reset height after sending message
      window.api.sendMessage(message);
    }
  };

  // Function to adjust the height of the textarea
  const adjustTextareaHeight = () => {
    input.style.height = 'auto'; // Reset the height
    input.style.height = `${Math.min(input.scrollHeight, window.innerHeight * 0.2)}px`; // Set the height to the scroll height or max 20% of viewport height
  };

  // Add an event listener to the send button to handle click events
  sendButton.addEventListener('click', sendMessage);

  // Add an event listener to the input field to handle Enter key events
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default behavior of Enter key
      sendMessage();
    }
  });

  // Add an event listener to adjust the height of the textarea on input
  input.addEventListener('input', adjustTextareaHeight);

  window.api.onReceiveMessage((message) => {
    displayMessage(message, 'bot');
  });

  // Function to display a message in the chat interface
  const displayMessage = (message, sender) => {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    
    // Auto scroll to the bottom of the messages
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };
});