const express = require('express');
const app = express();
const port = 3000;
app.get('/',(request,respond)=> respond.send("Hello ktant"));
app.get('/users',(requset, respond)=> respond.send('<h1> User list</h1>'));
app.listen(port,()=>console.log(`Example app listening on port ${port}!`))