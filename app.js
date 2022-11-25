const express = require('express')
const path = require('path')

var app = express()
const port = 3000

let contatore = 0;
app.use(express.json())
var bodyParser = require("body-parser");
var fs = require('fs');
const { stringify } = require('querystring');
const { info } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/', (req, res) => {
  res.send('Hello World!')
})


//registrazione 

app.get('/registrazione', (req, res) => {
  res.sendFile(path.join(__dirname, '/registrazione.html'))
})



app.post("/registrazione", function (req, res) {
  console.log("Ricevuto una richiesta POST");


  var config = { username: req.body.username, password: req.body.pass }



  var obj = JSON.parse(fs.readFileSync("account.json"))
  obj.push(config)

  fs.writeFileSync("account.json", JSON.stringify(obj));
  fs.close;

  res.redirect('/registrazioneOk');

})


app.get('/registrazioneOk', (req, res) => {
  res.sendFile(path.join(__dirname, '/registrazioneOk.html'))
})


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/login.html'))
})



app.post('/login', (req, res) => {


  var array = []

  var config = { username: req.body.username, password: req.body.pass }




  var array = JSON.parse(fs.readFileSync("account.json"))




  console.info(array)


  console.log(config)


  const foundUser = array.find((x) => x.username === config.username && x.password === config.password)


  console.log("trovato : ", foundUser, !!foundUser)


  if (Boolean(foundUser)) {
    return res.redirect('/loginOk');
  } else {




    return res.redirect('/loginKO');
  }





  })


app.get('/loginOk', (req, res) => {

  res.sendFile(path.join(__dirname, '/loginOK.html'))
})

app.get('/loginKO', (req, res) => {

  res.sendFile(path.join(__dirname, '/loginKO.html'))
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



