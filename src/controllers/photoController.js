const { getErrorMessage } = require('../utils/errorHelper');
const photoManager = require('../managers/photoManager');
const { isAuth, isOwner } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const photos = await photoManager.getAll().lean();
    res.render('photos', { photos });
})

router.get('/create', isAuth, (req, res) => {
    res.render('photos/create');
});

router.post('/create', isAuth, async (req, res) => {
    const photoData = {
        ...req.body,
        owner: req.user._id,
    }
    try {
        await photoManager.create(photoData);
        res.redirect('/photos');
    } catch (err) {
        res.render('photos/create', { error: getErrorMessage(err) })
    }
})

router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoManager.getOne(photoId).populate('comments.user').lean();
    const isOwner = req.user?._id == photo.owner._id;
    console.log(photo);
    res.render('photos/details', { photo, isOwner });
})

router.get('/:photoId/delete', isAuth, isOwner, async (req, res) => {
    const photoId = req.params.photoId;

    try {
        await photoManager.delete(photoId);
        res.redirect('/photos');
    } catch (err) {
        res.render('photos/details', { error: getErrorMessage(err) });
    };


});


router.get('/:photoId/edit', isAuth, isOwner, async (req, res) => {
    const photoId = req.params.photoId;

    const photo = await photoManager.getOne(photoId).lean();
    res.render('photos/edit', { photo });
});

router.post('/:photoId/edit', isAuth, isOwner, async (req, res) => {
    const photoData = req.body;
    const photoId = req.params.photoId;

    try {
        const photo = await photoManager.edit(photoId, photoData);
        res.redirect(`/photos/${photoId}/details`);
    } catch (err) {
        res.render('photos/edit', { photo:{ ...photoData, _id: photoId }, error: getErrorMessage(err) });
    }



})

router.post('/:photoId/comments', isAuth, async (req, res) => {
    const photoId = req.params.photoId;
    const { message } = req.body;
    const user = req.user._id;

    try {
        await photoManager.addComment(photoId, { user, message });
        res.redirect(`/photos/${photoId}/details`);
    } catch (err) {
        res.render('photos', { error: getErrorMessage(err) });
    }


})

module.exports = router;