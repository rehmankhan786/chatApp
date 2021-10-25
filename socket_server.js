const io = require("socket.io")(8000)

const users = {}
io.on("connection", socket => {
    socket.on("new-user-joined", Name => {
        users[socket.id] = Name;
        // console.log("new user", Name)
        socket.broadcast.emit('user-joined', Name)
    })
    socket.on("send", message => {
        socket.broadcast.emit("recieve", { message: message, Name: users[socket.id] })
    })
    socket.on("disconnect", message => {
        socket.broadcast.emit("left", { Name: users[socket.id] });
        delete users[socket.id];
    })
})
console.log("socket server running")