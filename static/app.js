const chatBox = document.getElementById('chat');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

const ws = new WebSocket(`ws://${location.host}/ws`);

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    const message = document.createElement('div');
    message.textContent = `[${data.type}] ${data.message}`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
};

sendButton.onclick = function() {
    const message = messageInput.value;
    if (message) {
        ws.send(JSON.stringify({ type: "user", message: message }));
        messageInput.value = '';
    }
};
