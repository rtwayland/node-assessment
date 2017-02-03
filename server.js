const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mainCtrl = require('./mainCtrl');

app.use(bodyParser.json());


app.get('/api/users', mainCtrl.get);
app.get('/api/users/:filter', mainCtrl.get);
// app.get('/api/users/:id', mainCtrl.get);

app.post('/api/users', mainCtrl.add);
app.post('/api/users/:privilege', mainCtrl.add);

app.put('/api/users/language/:id', mainCtrl.edit);
app.put('/api/users/forums/:id', mainCtrl.addForum);
app.put('/api/users/:id', mainCtrl.editUser);

app.delete('/api/users/forums/:id', mainCtrl.delete);
app.delete('/api/users/:id', mainCtrl.deleteUser);

app.listen(3000, function() {
    console.log('listening on 3000');
})

module.exports = app;
