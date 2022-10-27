const apiRoutes = require ('./api');

const constructorMethod = (app) => {
    app.use('/api',apiRoutes);

    app.use('*', (req, res) => {
        res.json({error: 'undefined route'}).status(404);
    });
};

module.exports = constructorMethod;