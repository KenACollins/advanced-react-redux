// module.exports is meant for require(), not import statements. Needs to be default export.
module.exports = app => {
    // When user wants to hit / URI path, run the function below, passing three arguments.
    // o req - HTTP request
    // o res - HTTP response
    // o next - error handling
    app.get('/', (req, res, next) => {
        res.send(['water bottle', 'phone', 'paper']);
    });
};
