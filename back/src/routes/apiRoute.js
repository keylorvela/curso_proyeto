const routes = require('./index');

// Here all the routes are processed
const route = (app) => {
    // //Route for requests related to user data

    app.use('/user', routes.user);

    //Routes for basic requests

    app.get('/', (req, res) => {
        return res.send('Received a GET HTTP method');
    });

    app.post('/', (req, res) => {
        return res.send('Received a POST HTTP method');
    });

    app.put('/', (req, res) => {
        return res.send('Received a PUT HTTP method');
    });

    app.delete('/', (req, res) => {
        return res.send('Received a DELETE HTTP method');
    });
}


module.exports = route;
