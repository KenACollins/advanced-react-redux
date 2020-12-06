export default app => {
    // When user wants to hit / URI path, run the function below, passing three arguments.
    // o req - HTTP request
    // o res - HTTP response
    // o next - error handling
    app.get('/', (req, res, next) => {
        res.send(['water bottle', 'phone', 'paper']);
    });
};
