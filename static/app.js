document.addEventListener("DOMContentLoaded", () => {
    const socket = new WebSocket("ws://localhost:8888/ws");

    // Элементы DOM
    const messagesContainer = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    // Обработка входящих сообщений
    socket.onmessage = function (event) {
        const message = document.createElement("li");
        message.textContent = event.data;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Автопрокрутка вниз
    };

    // Отправка сообщений
    sendButton.onclick = function () {
        if (messageInput.value.trim() !== "") {
            socket.send(messageInput.value.trim());
            messageInput.value = ""; // Очистка поля ввода
        }
    };

    // Обработка ошибок WebSocket
    socket.onerror = function (error) {
        console.error("WebSocket error:", error);
    };

    // Обработка закрытия соединения
    socket.onclose = function () {
        console.warn("WebSocket connection closed.");
    };
});
