const router = require('express').Router();
const notionRouter = require('./notionRouter');

router.use('/notion', notionRouter);

module.exports = router;
