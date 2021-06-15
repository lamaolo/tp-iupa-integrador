module.exports = (Handler) => async (req, res, next) => {
    try {
        await Handler(req, res, next);
    }catch (err) {
        next(err);
    }
}; 