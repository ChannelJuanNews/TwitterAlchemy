var express = require('express');
var app = express();


app.set('view engine', 'ejs')

/*This is so we can tie our front end dependencies together */
app.use(express.static('views'))
app.use(express.static('bower_components'))

app.get('/', function(req, res) {
    res.send('test')
});

app.post('/', function(req, res) {
    // do alchemy stuff here
});


app.listen(3000, function(){
    console.log('server started on port 3000')
})
