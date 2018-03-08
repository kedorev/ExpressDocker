var express = require('express');
var router = express.Router();
const fakedb = require('../db/fake-db');
//const forex = require('../db/forex');
var path = require('path');
const currencies = require(path.join(__dirname,'..','controller','currencies'));

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
            return currencies.getCurrencies('forex.json')
                .then(data => {
                    const aDiv = [];
                    for (let element in data) {
                         const promise = currencies.getConverCurrency('forex.json', element, dataProduct.priceEur)
                            .then(data2 => {
                                return {'value': data2, 'key': element};
                            })
                            .catch(err => {
                                console.error(err)
                            });
                        aDiv.push(promise);
                    }
                    return Promise.all(aDiv);
                })
                .catch(err => {
                    next(err);
                });
        })
        .then( (data) =>
            {fakedb.getOne(req.params.id)
                .then(dataProduct => {
                    res.render('detail', {title: 'detail', prices: data, 'euroPrice': dataProduct.priceEur, 'name': dataProduct.name});
                })
            }
        )
        .catch(err => {
           next(err)
        });
});


module.exports = router;
