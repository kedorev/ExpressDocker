var express = require('express');
var router = express.Router();

/* GET list page. */
router.get('/*', function(req, res, next) {
    var err = new Error('Private section. you can\'t access it. TGCM ! ');
    res.status(403);
    res.render('error');
});



module.exports = router;
