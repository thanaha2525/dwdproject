const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const homeRouter = require("./routes/home");
const authRouter = require("./routes/auth");
const checkRouter = require("./routes/check");
const session = require("express-session");
var fileupload = require("express-fileupload");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    login: false
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(fileupload());
app.use(homeRouter);
app.use(authRouter);
app.use(checkRouter);
/*app.use("/*", function(req, res) {
  res.render("index");
});*/

const PORT = process.env.port || 3003;
app.listen(PORT, function(err) {
  if (!err) {
    console.log(`App Listen in http://localhost:${PORT}`);
  } else {
    console.log(`Can't Listen in http://localhost:${PORT} err ${err}`);
  }
});
