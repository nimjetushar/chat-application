const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.send('server started')
});

const userObj = {};

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('join', function (data) {
        console.log(data);
        socket.join(data.chatUser);
        io.emit('broadcast', userObj);
        if (!userObj[data.currentUser]) {
            userObj[data.currentUser] = socket.id;
        }

        if (data.message) {
            io.emit('new_message', { user: data.currentUser, message: data.message });
        }
    });

    socket.on('end', function (data) {
        delete userObj[data.currentUser];
        io.emit('broadcast', userObj);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

const port = 5400;
server.listen(port, function () {
    console.log(`Listing at port ${port}`);
})

