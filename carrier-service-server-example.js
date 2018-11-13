var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  // Test server is working
  res.send('Hello World!');
});


app.post('/shipping_rate', function(req, res) {
  // Print out the body sent by Shopify
  console.log("RESPONSE FROM SHOPIFY");
  console.log(req.body);

  // Format our response correctly
  res.header("Content-Type", 'application/json');

  // Rates we're going to send back to Shopify
  var normal_rates = {
    "rates": [{
        "service_name": "Monday 1-3pm",
        "service_code": "ON",
        "total_price": "1",
        "description": "[my,fun,array]",
        "currency": "AUD",
        "min_delivery_date": "2018-04-12 14:48:45 -0400",
        "max_delivery_date": "2018-04-12 14:48:45 -0400",
      },
      {
        "service_name": "Monday 3-5pm",
        "service_code": "2D",
        "total_price": "2934",
        "currency": "USD",
        "min_delivery_date": "2013-04-12 14:48:45 -0400",
        "max_delivery_date": "2013-04-12 14:48:45 -0400"
      },
      {
        "service_name": "Monday 5-7pm",
        "service_code": "1D",
        "total_price": "3587",
        "currency": "USD",
        "min_delivery_date": "2013-04-12 14:48:45 -0400",
        "max_delivery_date": "2013-04-12 14:48:45 -0400"
      }
    ]
  };

  var restricted_rates = {
    "rates": [{
        "service_name": "Terrible Shipping Rate",
        "service_code": "ON",
        "total_price": "10000000",
        "description": "[my,fun,array]",
        "currency": "AUD",
        "min_delivery_date": "2018-04-12 14:48:45 -0400",
        "max_delivery_date": "2018-04-12 14:48:45 -0400",
      }
    ]
  };

  if(req.body["rate"]["origin"]["postal_code"] == "4101") {
    res.send(JSON.stringify(restricted_rates));
  } else {
    res.send(JSON.stringify(normal_rates));
  }
});

app.listen(3000, function() {
  console.log('My app listening on port 3000!');
})
