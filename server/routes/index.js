const apiRoutes = require ('./api');
const userRoutes = require('./users');
const gamesRoutes = require('./games');
const picksRoutes = require('./picks');

const constructorMethod = (app) => {
    app.use('/api',apiRoutes);
    app.use("/users",userRoutes);
    app.use("/games",gamesRoutes);
    app.use("/picks",picksRoutes);
    
    app.use('*', (req, res) => {
        res.json({error: 'undefined route'}).status(404);
    });
};

module.exports = constructorMethod;