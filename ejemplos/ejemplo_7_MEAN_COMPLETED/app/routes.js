module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // app custom routes
    var server = require('../server.js');
    var People = server.PersonModel;
    var Todos = server.TodoModel;
    var Team = server.Person;

    app.get('/api/todos', function(req, res){
        var data = {};
        Todos.find(function(error, _data){
            data = _data;
            res.send(data);
        })
    });

    app.get('/api/users', function(request, response){
        var data = {};
        // find gets all items in collection
        People.find({}).sort({'id':1}).exec(function(error, _data){
            console.log("Getting people from mongoDB");
            data = _data;
            response.send(data);
        });
    });

    app.post('/api/users', function(request, response){

        console.log("id of first person: ", request.body[0]._id);
        var usersToSave = request.body,
            id = request.body[0]._id;

        console.log("Collection length: ", usersToSave.length);
        console.log("updating collection");

        for(var i = 0, len = usersToSave.length; i < len; i++) {
            var id = usersToSave[i].id,
                userToSave = usersToSave[i];
            // IMPORTANT! si no se elimina '_id' mongo lanza un error: 'Mod on _id not allowed',
            delete usersToSave[i]._id;

            People.update({id: id}, userToSave, function(err){
                if(err){
                    console.log("there was an error updating collection", err);
                }
            });
        }

        People.find(function(error, _data) {
            response.send(_data);
        });
        //People.create(usersToSave);
    });

    app.get('/api/people', function(req, res) {
        // use mongoose to get all nerds in the database
        Team.find({}, {id:1}, function(err, people) {
            console.log("people ", people);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(people); // return all nerds in JSON format
        });
    });

    app.get('/api/people/:id', function(req, res) {
        // use mongoose to get all nerds in the database
        Team.findById(req.params.id, function(err, person) {
            console.log("person found ", person);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(person); // return all nerds in JSON format
        });
    });
    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};