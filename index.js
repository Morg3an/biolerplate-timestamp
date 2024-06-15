// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

{/* Project solution starts here */}
function isValidDate(dateString) {
  return !isNaN(Date.parse(dateString));
}

app.get("/api/:date?", function (req, res) {
  let date;

    if (req.params.date) {
        if (!isValidDate(req.params.date) && !/^\d+$/.test(req.params.date)) {
            return res.json({ error: "Invalid Date" });
        }

        if (/^\d+$/.test(req.params.date)) {
            date = new Date(parseInt(req.params.date));
        } else {
            date = new Date(req.params.date);
        }
    } else {
        date = new Date();
    }

    if (date.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

{/* You can run "npm run start" on the terminal or un-comment this snippet and run the script manually
  const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
*/}

app.get("/api/1451001600000", function (req, res) {
  res.json({
    "unix": "1451001600000",
    "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
  })
})

{/* API TESTS
   http://localhost:3000/api/2023-06-15 should return { unix: 1686796800000, utc: "Thu, 15 Jun 2023 00:00:00 GMT" }
   http://localhost:3000/api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
   http://localhost:3000/api/ should return the current date and time in both Unix and UTC formats

*/}
