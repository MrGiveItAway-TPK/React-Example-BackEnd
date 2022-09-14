'use strict';

const express = require('express');
const cors = require('cors');
const mongs = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json())
const { response } = require('express');

// const M = `mongodb+srv://MongoMGIATPK:oCvS3zcKjDTGyw4Q@cluster0.ir1rb6u.mongodb.net/?retryWrites=true&w=majority`;

// mongs.connect(`${M}`);

// const PORT = 3000;

app.get('/test', (request, response) => {
  response.send('test request received')
})

// const MovieShema = new mongs.Schema({
//   title: String,
//   description: String,
//   status: String,
//   name: String
// })

// const Movie = mongs.model('MovieModel', MovieShema)

// async function seedData () {
//   const First_Movie = new Movie({
//     title: 'Movie 1',
//     description: 'Movie 1 Desc',
//     status: 'Movie 1 In Cinema',
//     name: "Admin"
//   })
//   const Second_Movie = new Movie({
//     title: 'Movie 1',
//     description: 'Movie 1 Desc',
//     status: 'Movie 1 In Cinema',
//     name: "Admin"
//   })
//   const Third_Movie = new Movie({
//     title: 'Movie 1',
//     description: 'Movie 1 Desc',
//     status: 'Movie 1 In Cinema',
//     name: "Admin"
//   })
//   await First_Movie.save()
//   await Second_Movie.save()
//   await Third_Movie.save()
// }

// seedData();

// app.get('/Movie', getbookHandler)

// function getbookHandler (req, res) {
//   const name = req.query.name;
//   Movie.find( {name:name}, (err, result) => {
//     if (err) {
//       console.log(err)
//     } 
//     else {
//       res.json(result)
//     }
//   }
//   )
// }


// app.post('/Movie', addHandler);

// async function addHandler(req,res) {
//   const {title,description,status,name} = req.body;
//   await Movie.create({
//     title:title,
//     description:description,
//     status:status,
//     name:name,
      
//   });

//   Movie.find({name:name},(err,result)=>{
//       if(err)
//       {
//           console.log(err);
//       }
//       else
//       {
//           // console.log(result);
//           res.send(result);
//       }
//   })
// }


// app.delete('/Movie/:id',deleteHandler);
 
//   function deleteHandler(req,res) { 
//   const bookId = req.params.id;
//   const name = req.query.name;
 
//   Movie.deleteOne({_id:bookId},(err,result)=>{
      
//       Movie.find({name:name},(err,result)=>{ 
//           if(err)
//           {
//             console.log(err);
//           }
//           else
//           {
             
//             res.send(result);
//           }
//       })

//   })
  
// }

// app.put('/Movie/:id',updateHandler);

// function updateHandler(req, res){
//   const id = req.params.id;
//   const {title,description,status,name} = req.body;

//   Movie.findByIdAndUpdate(id, {title,description,status,name}, (err, result) => {
//     if(err){
//       console.log(err);
//     } else {
//       Movie.find({name:name},(err,result)=>{ 
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             res.send(result);
//         }
//     })
//     }
//   })

// }

// app.listen(PORT, () => console.log(`listening on ${PORT}`))