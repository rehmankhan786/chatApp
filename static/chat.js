const socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });
const form = document.getElementById("send_container")
const message = document.getElementById("a_message")
const messageContainer = document.getElementById("message_container")
const time = new Date()
current_time = time.toLocaleTimeString()
const tune = new Audio('pristine-609.mp3')
const lefttune = new Audio("bye.mp3")
const append = (message, position) => {
    const messageElement = document.createElement('div')
    const timespan = document.createElement("span")
    timespan.innerHTML = current_time
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    messageElement.appendChild(timespan)
    timespan.classList.add('time')
    if (position == "left") {
        tune.play()
    } else {}
}
const Name = prompt("Enter Your Name")
socket.emit("new-user-joined", Name)

socket.on('user-joined', Name => {
    append(`${Name} joined the chat `, "middle_j")
})
form.addEventListener('submit', (e) => {
    e.preventDefault()
    append(`you:${message.value}`, "right")
    socket.emit('send', message.value)
    message.value = ""
    form.scrollTo = form.scrollHeight
})
socket.on('recieve', data => {
    append(`${data.Name}: ${data.message}`, "left")
})
socket.on('left', data => {
    append(`${data.Name}:Left The Chat`, "middle_l")
})