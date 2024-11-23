export const validateNickname = expressAsyncHandler(async (req, res, next) => {
    res.set('Connection', 'keep-alive');
    next();
});