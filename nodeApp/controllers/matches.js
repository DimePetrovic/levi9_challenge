const MatchesService = require('../services/matches');
const axios = require("axios")
// POST /matches
function createMatch(req, res) {
    try {
        MatchesService.createMatch(req.body);
        const postData = {a:"a"};
        axios.post('https://lfxbmuwrntckwbozc22crpndoa0lpdbn.lambda-url.eu-central-1.on.aws/', postData)
    
        res.status(200).send()

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {{}
    createMatch,
};
