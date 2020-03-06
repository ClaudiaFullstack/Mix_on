var express = require('../node_modules/express');
var router = express.Router();
const connection = require('../config/db.js')
// var bpm = new BPM();

// bpm.tap();
// setTimeout(function() {
//   console.log(b.tap());
// }, 1000);

// var AudioContext = require("web-audio-api").AudioContext;

var fs = require("fs");
 
var calcTempo = function (buffer) {
  var audioData = [];
  // Take the average of the two channels
  if (buffer.numberOfChannels == 2) {
    var channel1Data = buffer.getChannelData(0);
    var channel2Data = buffer.getChannelData(1);
    var length = channel1Data.length;
    for (var i = 0; i < length; i++) {
      audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
    }
  } else {
    audioData = buffer.getChannelData(0);
  }
  var mt = new MusicTempo(audioData);
 
  console.log(mt.tempo);
  console.log(mt.beats);
}
 
var data = fs.readFileSync("MEL BELL - Jua Kali (Original Mix) [Bullfinch].mp3");
 
var context = new AudioContext();
context.decodeAudioData(data, calcTempo);
// var multer = require ('multer');

// //subida de archivos
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
// var upload = multer({ storage: storage })


//  READ   ALL TRACKs
router.get('/', function (req, res) {
  connection.query('SELECT * FROM tracks', (err, data) => {
    if (err) {
      throw err;
    }
    else {
      res.render('tracks', { data: data })
    }

  });
});


// //CREATE TRACK
// router.post('/',function (req, res) {

//   let sql = "INSERT INTO `tracks` set? ";
//   let id_artist = req.body.id_artist;
//   let track_name = req.body.track_name;
//   let style = req.body.style;
//   let bpm = req.body.bpm;
//   let armony = req.body.armony;
//   let audio_format = req.body.audio_format;
//   console.log(req.file)


//   console.log(req.body)
//   res.send('ok')
//   // connection.query(sql, { id_artist, track_name, style, bpm, armony, audio_format,upload_file }, (err, data) => {
//   //   if (err) throw err;

//   //   res.redirect('/tracks')
//   // });
// });


//EDITO TRACKS
router.get('/edit/:id', function (req, res) {
  let id = req.params.id;

  //renderizo la vista
  connection.query("SELECT * FROM tracks where id_track = ?", [id], (err, results) => {
    let id_tracks = results[0].id

    res.render('tracks_edit', {
      results: results[0]
    })
  })

})


router.post("/update/:id", function (req, res) {
  // let sql = "UPDATE INTO `tracks` set? ";
  let id = req.params.id;
  let track_name = req.body.track_name;
  let style = req.body.style;
  let bpm = req.body.bpm;
  let armony = req.body.armony;
  let audio_format = req.body.audio_format;
  connection.query('UPDATE tracks set? WHERE id_track = ' + id, { track_name, style, bpm, armony, audio_format },
    (err, results) => {
      res.redirect('/tracks')

    })
})


// router.post('/', upload.single('myFile'), function (req, res, next) {

//   let img = req.file.originalname;
//   console.log(req.file.originalname);

//   connection.query("INSERT INTO `tracks` (upload_file) VALUES ('" + file + "')",
//     (error, tracks) => {
//       res.send('ok')
//     });
// })

//DELETE

router.get('/delete/:id', function (req, res) {

  let id = req.params.id;

  connection.query("DELETE FROM tracks WHERE id_track = " + id,
    function (err, result) {

       res.redirect('/tracks')
     
    });
})






module.exports = router;
