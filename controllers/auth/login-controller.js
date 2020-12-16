const db = require("../../db/connect");
var md5 = require("md5");

const getLogin = (req, res, next) => {
  res.render("employLogin", { massage: "" });
};

const postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  var hash = md5(password);
  const user = `select * from staff where username = '${username}' and password ='${hash}'`;
  db().query(user, (err, rs) => {
    if (err) throw err;
    if (rs.length > 0) {
      req.session.loggedin = true;
      const users = (req.session.username = rs[0].username);
      const name = (req.session.name = rs[0].name);
      const status = (req.session.status = rs[0].status);
      req.session.perId = rs[0].perId;
      res.redirect("/adminmanu");
    } else {
      req.session.loggedin = false;
      req.session.username = "";

      res.render("employLogin", {
        massage: "** username หรือ password ผิด กรุณากรอกใหม่ **"
      });
    }
  });
};

const logout = (req, res, next) => {
  req.session.loggedin = false;
  req.session.username = "";
  res.render("index");
};

module.exports = getLogin;
module.exports.postLogin = postLogin;
module.exports.logout = logout;
