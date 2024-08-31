const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    console.log('In add-product middleware!');
    res.status(200).send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
});

router.post('/product', (req, res, next) => {
   console.log(req.body);
   res.status(201).redirect('/');
});

module.exports = router;