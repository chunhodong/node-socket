var express = require('express');
var router = express.Router();


//방목록
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//방목록
router.get('/room', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/room',async (req,res,next)=>{

});

module.exports = router;
