const router = require('express').Router();
const { Comment } = require('../../models');

// GET comments
router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// CREATE new comment
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
})

// DELETE a comment
router.delete('/:id', (req, res) => {
    Comment.delete({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData){
            res.status(404).json('No user found with ths id')
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;