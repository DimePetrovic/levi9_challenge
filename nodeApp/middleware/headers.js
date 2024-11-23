 const headers = expressAsyncHandler(async (req, res, next) => {
    res.set('Connection', 'keep-alive');
    next();
});

module.exports = headers