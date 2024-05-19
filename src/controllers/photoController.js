const { getErrorMessage } = require('../utils/errorHelper');
const photoManager = require('../managers/photoManager');

const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('photos/create');
});

router.post('/create', async (req, res) => {
    const photoData = {
        ...req.body,
        owner:req.user._id,
    }
    try {
        await photoManager.create(photoData);
        res.redirect('/photos');
    } catch (err) {
        res.render('photos/create', { error: getErrorMessage(err) })
    }
})

module.exports = router;