var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');
var app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.send('test')
});

var userObj = {},
    groupChat = false;

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('join', function (data) {
        console.log(data);
        socket.join(data.chatUser);
        io.emit('broadcast', userObj);
        // socket.join(data.curr);
        if (!userObj[data.currUser]) {
            userObj[data.currUser] = socket.id;
        }
        if (!groupChat) {
            if (userObj[data.chatUser]) {
                var id = userObj[data.chatUser]
                data.message && io.to(id).emit('new_msg', { user: data.currUser, msg: data.message });
                // io.sockets.in(data.currUser).emit('new_msg', { msg: data.message });
            }
        } else {
            data.message && io.emit('new_msg', { user: data.currUser, msg: data.message });
        }
    });

    socket.on('end', function (data) {
        delete userObj[data.currUser];
        io.emit('broadcast', userObj);
    })

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

server.listen(3000, function () {
    console.log('Listing at port 8080')
})

