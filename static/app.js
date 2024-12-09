document.addEventListener("DOMContentLoaded", () => {
    const socket = new WebSocket("ws://localhost:8888/ws");

    // Элементы DOM
    const messagesContainer = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const userNameInput = document.getElementById("user-name-input");
    const setNameButton = document.getElementById("set-name-button");

    let userName = "Аноним"; // Имя пользователя по умолчанию

    // Установка имени пользователя
    setNameButton.onclick = function () {
        if (userNameInput.value.trim() !== "") {
            userName = userNameInput.value.trim();
            alert(`Ваше имя: ${userName}`);
        }
    };

    // Обработка входящих сообщений
    socket.onmessage = function (event) {
        const data = JSON.parse(event.data);

        if (data.type === "system") {
            // Пропускаем системные сообщения
            return;
        }

        const message = document.createElement("li");
        message.innerHTML = `<strong>${data.name}:</strong> ${data.message}`;
        message.style.wordBreak = "break-word"; // Перенос длинного текста
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Автопрокрутка вниз
    };

    // Отправка сообщений
    const sendMessage = () => {
        if (messageInput.value.trim() !== "") {
            const payload = {
                name: userName,
                message: messageInput.value.trim(),
            };
            socket.send(JSON.stringify(payload)); // Отправка сообщения в формате JSON
            messageInput.value = ""; // Очистка поля ввода
        }
    };

    // Отправка сообщения по нажатию на кнопку
    sendButton.onclick = sendMessage;

    // Отправка сообщения по нажатию клавиши Enter
    messageInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    // Обработка ошибок WebSocket
    socket.onerror = function (error) {
        console.error("WebSocket error:", error);
    };

    // Обработка закрытия соединения
    socket.onclose = function () {
        console.warn("WebSocket connection closed.");
    };
});
