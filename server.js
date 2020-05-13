// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engines','pug');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// https://expressjs.com/en/starter/basic-routing.html
var todo=[{id:1,active:"Đi chợ"},{id:2,active:"Nấu cơm"},{id:3,active:"Rửa bát"},{id:3,active:"Học code tại CodersX"}];
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
  if(search==null){
    response.render('todos.pug',{
    todo:todo
  })}
  else{
    var todolist=todo.filter(x=> x.active.toLowerCase().indexOf(search)!== -1)
  response.render('todos.pug',{
    todo:todolist
  })
  }
})
app.get('/todos/create',(req,res)=>{
  res.render('create.pug');
})
app.post('/todos/create',(req,res)=>{
  todo.push(req.body);
  res.redirect('/todos')
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
