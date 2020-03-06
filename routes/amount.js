
var express = require('express');
var router = express.Router();
const connection = require('../config/db.js')




router.get('/amount',function(req,res){
    connection.query('SELECT * FROM amount', (err, data) => {
      if (err) {
        throw err;
      }
      else {
        res.render('amount', {data:data})
      }
      console.log(data);
    });
  });




  
  module.exports = router;
