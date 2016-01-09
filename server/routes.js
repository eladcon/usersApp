var UsersRepository = require("./usersRepository");
var SocketCollection = require("./socketCollection");

var repo = new UsersRepository();
var socketCollection = new SocketCollection();

module.exports = function(app, io) {
    io.on('connection', function(socket) {
        socketCollection.add(socket);
    });

    // set REST api
    app.get('/users', function(req, res) {
      res.json(repo.get());
    });

    app.post('/users', function(req, res) {
      var user = repo.add(req.body);
      res.json(user);
      socketCollection.emit('add', user);
    });

    app.put('/users/:id', function(req, res) {
      var success = repo.update(req.body);
      res.json(success ? 200 : 404);
      socketCollection.emit('update', req.body);
    });

    app.delete('/users/:id', function(req, res) {
      var success = repo.delete(req.params.id);
      res.json(success ? 200 : 404);
      socketCollection.emit('delete', req.params.id);
    });

};