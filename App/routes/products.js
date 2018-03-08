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

router.get('/:id', function(req, res, nex){
    fakedb.getOne(req.params.id)
        .then(dataProduct => {
            console.log(dataProduct)
        })
        .catch(err => {
           next(err)
        });
});


module.exports = router;
