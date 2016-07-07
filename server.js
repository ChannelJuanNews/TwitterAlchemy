var express = require('express');
var app = express();

var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI(process.env.ALCHEMY_API_KEY);

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


app.set('view engine', 'ejs')

/*This is so we can tie our front end dependencies together */
app.use(express.static('views'))
app.use(express.static('bower_components'))

var sentiments = []

app.get('/', function(req, res) {
    res.render('index')
});

app.get('/alchemy', function(req, res) {

    /*First we need to hit up twitter for our tweets*/
    var params = {
        screen_name: 'nodejs'
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (error){
            console.log(err)
            throw error
        }

        getSentiments(tweets)
        if (sentiments.length < 0) {
            console.log('wtf')
        }

        res.render('result.ejs', {
            tweets : tweets,
            sentiments : sentiments
        })

    });

});

function getSentiments(tweets) {
    sentiments = []

    for (var i = 0; i < tweets.length; i++){

        /* this is where it goes down */
        alchemy.sentiment(tweets[i].text, {}, function(err, response) {
          if (err) {
              console.log(err)
              throw err;
          }
          else {
               var sentiment = response.docSentiment;
               sentiments.push(response.docSentiment)
               console.log(sentiment)
          }

        });
    }

}

app.listen(3000, function(){
    console.log('server started on port 3000')
})
