const userRoutes = require('./users');
const gamesRoutes = require('./games');
const picksRoutes = require('./picks');

const constructorMethod = (app) => {
    app.use("/api/users",userRoutes);
    app.use("/api/games",gamesRoutes);
    app.use("/api/picks",picksRoutes);
    
    app.use('*', (req, res) => {
        res.json({error: 'undefined route'}).status(404);
    });
};

module.exports = constructorMethod;