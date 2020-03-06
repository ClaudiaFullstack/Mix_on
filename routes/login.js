var express = require('express');
var router = express.Router();
const connection = require('../config/db.js')

// /* GET home page. */
// router.get('/', function(req, res) {
//     res.render('login')
// });

// //router.post del login
// router.post('/', function (req,res){
//     let email = req.body.email;
//   connection.query('SELECT * FROM artist ',(error,data)=>{
//     if (error){
//       throw error
//     }
//     else{
//       res.render('dixon', {data:data})
//     }
//   })
// })


//registro de artistas
router.get('/register', function(req, res) {
    res.render('register')
});

router.get('/', function(req, res) {
    connection.query(`SELECT * FROM mix_on.artist JOIN mix_on.tracks on artist.id_artist = tracks.id_artist`,
    (err,data)=>{
      if (err) {
        throw err;
      }
      else {
    
        res.render('index', { data: data })
      }
   });
  });
  
///router post register
router.post('/register', function (req, res) {
  console.log("aaa")
    let name = req.body.name;
    let last_name = req.body.last_name;
    let artist_name = req.body.artist_name;
    let nationality = req.body.nationality;
    let email= req.body.email;
    let password = req.body.password;
    

    let sql = "INSERT INTO artist set? ";
    connection.query(sql, {name,last_name,artist_name,nationality,biography,email,password},(error,artist)=>{
          if (error) {
            throw error;
        }
        res.redirect('/index');
        });
      });
    
module.exports = router;
