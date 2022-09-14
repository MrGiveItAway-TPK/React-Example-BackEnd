'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongs = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());
const { response } = require('express');

mongs.connect(procces.env.MONGO);

const PORT = process.env.PORT;

//http://localhost:3001/test
app.get('/test.', (request, response) => {
  response.send('test request received')
})

const BookSchema = new mongs.Schema({
  title: String,
  discription: String,
  status: String,
  name: String
})

const Book = mongs.model('BookModel', BookSchema)

async function seedData () {
  const firstBook = new Book({
    title: 'anatomy',
    discription: 'Medical subjects',
    status: 'available',
    name: "Admin",
  })
  const secondBook = new Book({
    title: 'liguastics',
    discription: 'English language subjects',
    status: 'deserved',
    name: "Admin",
  })
  const thirdBook = new Book({
    title: 'special subject in computer engineer',
    discription: 'computer language subjects',
    status: 'not exist',
    name: "Admin",
  })
  await firstBook.save()
  await secondBook.save()
  await thirdBook.save()
}

//seedData();

//http://localhost:3001/book
app.get('/book', getbookHandler)

function getbookHandler (req, res) {
  const name = req.query.name;
  Book.find( {name:name}, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.json(result)
    }
  }
  )
}


app.post('/book', addHandler);

async function addHandler(req,res) {
  //console.log(req.body);
  
  const {title,discription,status,name} = req.body; //Destructuring assignment
  await Book.create({
    title:title,
    discription:discription,
    status:status,
    name:name,
      
  });

  Book.find({name:name},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          // console.log(result);
          res.send(result);
      }
  })
}


app.delete('/book/:id',deleteHandler);
 
  function deleteHandler(req,res) { 
  const bookId = req.params.id;
  const name = req.query.name;
 
  Book.deleteOne({_id:bookId},(err,result)=>{
      
      Book.find({name:name},(err,result)=>{ 
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

app.put('/book/:id',updateHandler);

function updateHandler(req, res){
  const id = req.params.id;
  const {title,discription,status,name} = req.body;

  Book.findByIdAndUpdate(id, {title,discription,status,name}, (err, result) => {
    if(err){
      console.log(err);
    } else {
      Book.find({name:name},(err,result)=>{ 
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