const apiRoutes = require ('./api');
const userRoutes = require('./users');

const constructorMethod = (app) => {
    app.use('/api',apiRoutes);
    app.use("/users",userRoutes);

    app.use('*', (req, res) => {
        res.json({error: 'undefined route'}).status(404);
    });
};

module.exports = constructorMethod;