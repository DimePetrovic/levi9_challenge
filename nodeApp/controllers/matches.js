const MatchesService = require('../services/matches');

// POST /matches
function createMatch(req, res) {
    try {
        MatchesService.createMatch(req.body);
        res.status(200).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createMatch,
};
