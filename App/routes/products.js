var express = require('express');
var router = express.Router();
const fakedb = require('../db/fake-db');
const forex = require('../db/forex');

/* GET list page. */
router.get('/list', function(req, res, next) {
    fakedb.getAll()
        .then(datasPromise => {
            console.log(datasPromise);
            res.render('liste', {title: 'liste', data: datasPromise});
        })
        .catch(err =>{
            next(err);
        });

});



router.get('/add', (req, res, next) => {

    res.render('add', {title: "addProduct", success: false });
});

router.post('/add', (req, res, next) => {

    const result = { name: req.body.Name, priceEur: req.body.Price};
    fakedb.add(result)
        .then(data => {

            res.render('add', {title: "addProduct", success: true });
        })
        .catch(err => {
            next(err);
        });
});



router.get('/:id', function(req, res, next){
    fakedb.getOne(req.params.id)
        .then(dataProduct => {
            console.log(dataProduct)
        })
        .catch(err => {
           next(err)
        });
});


module.exports = router;
