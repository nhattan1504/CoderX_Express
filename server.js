// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const shortid= require('shortid');
const bodyParser = require('body-parser');
const low= require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

app.set('view engines','pug');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// https://expressjs.com/en/starter/basic-routing.html
db.defaults({ todo: []})
  .write()
//data
app.get('/', (request, response) => {
  response.send('I love CodersX');
});
//app.get('/todos',(request,response)=>{
 //response.render('todos.pug',{
  //  todo:todo
  //})
//});
app.get('/todos',(request,response)=>{
  var search=request.query.q;
  if(search){
    var todolist=db.get('todo').value().filter(x=> x.active.toLowerCase().indexOf(search.toLowerCase())!== -1)
  response.render('todos.pug',{
    todo:todolist
  })
    }
  else{
    response.render('todos.pug',{
    todo:db.get('todo').value()
  })
  }
})
app.get('/todos/create',(req,res)=>{
  res.render('create.pug');
})
app.post('/todos/create',(req,res)=>{
  req.body.id=shortid.generate();
  db.get('todo').push(req.body).write();
  res.redirect('/todos')
})

app.get('/todos/:id/delete',(req,res)=>{
  var id=req.params.id;
  db.get('todo')
  .remove({ id:id})
  .write()
  res.redirect('/todos')
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
