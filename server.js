let nforce = require('nforce');
let faye = require('faye');
let express = require('express');
let cors = require('cors');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
// The account id of the distributor
let accountId;
let PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Express server listening on ${PORT}`));

app.use(cors());
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/www/index.html');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
});
