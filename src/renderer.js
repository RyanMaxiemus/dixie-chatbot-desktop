document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  // Function to handle sending a message
  async function sendMessage() {
    const message = input.value.trim(); // Declare message with const

    if (message) {
      displayMessage(`You: ${message}`, 'user');
      input.value = '';
      adjustTextareaHeight();

      displayMessage('Bot: Thinking...', 'bot-loading-message'); // Display a loading message while waiting for the response

      try {
        const response = await window.chatAPI.sendMessage(message);
        removeLoadingIndicator(); // Remove the loading indicator
        displayMessage(`Bot: ${response}`, 'bot');
      } catch (error) {
        removeLoadingIndicator(); // Remove the loading indicator
        console.error('Error from the backend: ', error); // Log the error to the console
        displayMessage('Error: Failed to contact the server. Please check the console for details.', 'bot');
      }
    } else {
      alert('Please enter a message before sending.'); // Alert the user if the message is empty
    }
  }

  // Function to remove the loading indicator
  const removeLoadingIndicator = () => {
    const loadingMessage = document.querySelector('.bot-loading-message');
    if (loadingMessage) {
      loadingMessage.remove();
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

  window.chatAPI.onReceiveMessage((message) => {
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
