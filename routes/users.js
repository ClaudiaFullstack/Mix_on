var express = require('express');
var router = express.Router();
const connection = require('../config/db.js')
var multer = require ('multer');

//subida de archivos
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

//get de un select todos los artistas
router.get('/',function(req,res){
  connection.query('SELECT * FROM artist', (err, data) => {
    if (err) {
      throw err;
    }
    else {
      res.render('user', {data:data})
    }
    console.log(data);
  });
});


router.post('/', function (req, res) {
  let name = req.body.name;
  let last_name = req.body.last_name;
  let artist_name = req.body.artist_name;
  let nationality = req.body.nationality;
  let email= req.body.email;
  let password = req.body.password;

  
//primera query
  let sql = "INSERT INTO artist set? ";
   connection.query(sql, {name,last_name,artist_name,nationality,email,password},(error,artist)=>{

  res.redirect('/index');

  });

});

//EDITO ARTIST
router.get('/edit/:id', function (req, res) {
  let id = req.params.id;

  connection.query("SELECT * FROM artist where id_artist = ?", [id], (err, results) => {

    console.log('bd devuelve --- ', results);
    
    let id = results[0].id;

    res.render('user_edit', {
      results: results[0]
      
    })
    
  })

})

router.post("/update/:id", function (req, res) {
  // let sql = "UPDATE INTO `tracks` set? ";
  let id = req.params.id;
  let name = req.body.name;
  let last_name = req.body.last_name;
  let artist_name= req.body.artist_name
  let nationality = req.body.nationality;
  let email = req.body.email;
  let password = req.body.password;
  connection.query('UPDATE artist set? WHERE id_artist = ' + id, { name,last_name,artist_name, nationality, email,password },
    (err, results) => {
      res.redirect('/users')

    });
})


//BORRO ARTISTAS
  router.get('/delete/:id', function (req, res) {

    let id = req.params.id;
    console.log(req.params.id)
  
    connection.query("DELETE FROM artist where id_artist = " + id,
      function (err, result) {
  
         res.redirect('/users')
       
      });
  })
  



//CREATE TRACK
router.post('/createTrack/:id', upload.single('myFile'),function (req, res) {
console.log(req.params)
  let sql = "INSERT INTO `tracks` set? ";
  // let id_artist = req.body.id_artist;
  let track_name = req.body.track_name;
  let style = req.body.style;
  let bpm = req.body.bpm;
  let armony = req.body.armony;
  let audio_format = req.body.audio_format;
  let upload_file = req.file.originalname;

let id_artist =req.params.id
  // console.log(req.body)
  // res.send('ok')
  connection.query(sql, {id_artist, track_name, style, bpm, armony, audio_format,upload_file }, (err, data) => {
    if (err) throw err;

    res.redirect('/tracks')
  });
});

module.exports = router;
