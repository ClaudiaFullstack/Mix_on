// var express = require('express');
// var router = express.Router();
// const connection = require('../config/db.js')

// /* GET home page. */
// router.get('/', function(req, res) {
//   connection.query(`SELECT * FROM mix_on.artist JOIN mix_on.tracks on artist.id_artist = tracks.id_artist`,(err,data)=>{
//     if (err) {
//       throw err;
//     }
//     else {
  
//       res.render('dixon', { data: data })
//     }
//  });
// });

// //edito datos en la tabla

// router.get('/edit/:id', function(req,res){
//   let id = req.params.id;

//   //renderizo la vista
//   connection.query("SELECT * FROM artist where id_artist = ?", [id], (err, results) => {
//     let id_artist = results [0].id

//     connection.query('SELECT * FROM tracks where  id_artist= ?', [id_artist],(error,resultstrack)=>{
//        res.render('dixon_edit',{
//          results:results[0],
//          resultstrack:resultstrack[0]
//         })

//        });
//     });

// });


// router.post("/update/:id", function (req,res){
//   let name = req.body.name;
//   let last_name = req.body.last_name;
//   let artist_name = req.body.artist_name;
//   let nationality = req.body.nationality;
//   let biography = req.body.biography;
//   let email = req.body.email;
//   let track_name= req.body.track_name;

//   let sql = "UPDATE INTO tracks set? WHERE id_artist" +id ;

//   connection.query('UPDATE artist set? WHERE id_artist = '  + id, {name,last_name,artist_name,nationality,biography,email},
//    (error, results) => {

//      connection.query('UPDATE tracks set? WHERE id_artist= ' + id, {track_name},
//      (error, results) =>{
     
//       res.redirect('/index');
//    })
//    })
// })


// module.exports = router;
