'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongs = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());
const { response } = require('express');

const mongose = `mongodb://MongoMGIATPK:clxanPYKtOojjkm8@ac-ft60bmc-shard-00-00.ir1rb6u.mongodb.net:27017,ac-ft60bmc-shard-00-01.ir1rb6u.mongodb.net:27017,ac-ft60bmc-shard-00-02.ir1rb6u.mongodb.net:27017/?ssl=true&replicaSet=atlas-12rc7j-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongs.connect(`${mongose}`);

const PORT = process.env.PORT || 3000;

app.get('/mgiatpk_test', (request, response) => {
  response.send('MGIATPK TEST RESPONSE')
})

const MovieSchema = new mongs.Schema({
  title: String,
  description: String,
  status: String,
  name: String
})

const Movie = mongs.model('MovieModel', MovieSchema)

async function seedData () {
  const firstMovie = new Movie({
    title: 'anatomy',
    description: 'Medical subjects',
    status: 'available',
    name: "Admin",
  })
  const secondMovie = new Movie({
    title: 'liguastics',
    description: 'English language subjects',
    status: 'deserved',
    name: "Admin",
  })
  const thirdMovie = new Movie({
    title: 'special subject in computer engineer',
    description: 'computer language subjects',
    status: 'not exist',
    name: "Admin",
  })
  await firstMovie.save()
  await secondMovie.save()
  await thirdMovie.save()
}

/* seedData(); FIRST TIME ONLY */

app.get('/Movie', getMovieHandler)

function getMovieHandler (req, res) {
  const name = req.query.name;
  Movie.find( {name:name}, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result)
    }
  }
  )
}


app.post('/Movie', addHandler);

async function addHandler(req,res) {
  const {title,description,status,name} = req.body;
  await Movie.create({
    title:title,
    description:description,
    status:status,
    name:name,
      
  });

  Movie.find({name:name},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          res.send(result);
      }
  })
}


app.delete('/Movie/:id',deleteHandler);

  function deleteHandler(req,res) { 
  const MovieId = req.params.id;
  const name = req.query.name;

  Movie.deleteOne({_id:MovieId},(err,result)=>{
      
      Movie.find({name:name},(err,result)=>{ 
          if(err)
          {
            console.log(err);
          }
          else
          {
            res.send(result);
          }
      })

  })
  
}

app.put('/Movie/:id',updateHandler);

function updateHandler(req, res){
  const id = req.params.id;
  const {title,description,status,name} = req.body;

  Movie.findByIdAndUpdate(id, {title,description,status,name}, (err, result) => {
    if(err){
      console.log(err);
    } else {
      Movie.find({name:name},(err,result)=>{ 
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
    }
  })

}

app.listen(PORT, () => console.log(`listening on ${PORT}`))