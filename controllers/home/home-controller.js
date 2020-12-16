const db = require("../../db/connect");

const index = (req, res, next) => {
  res.render("index", { meaasage: "hello" });
};

const home = (req, res, next) => {
  const getData =
    "SELECT * FROM `check` where status = 'รอจ่าย' order by id desc";

  db().query(getData, (err, result) => {
    res.render("allCheck", { result: result });
  });
};

const getfind = (req, res, next) => {
  res.render("searchCheck", { result: [" "] });
};

const findHome = (req, res, next) => {
  const find = req.body.find;
  const getData = "SELECT * FROM `check` WHERE `name` = " + `'${find}'`;
  db().query(getData, (err, rs) => {
    res.render("searchCheck", { result: rs });
  });
};

module.exports = home;
module.exports.findHome = findHome;
module.exports.index = index;
module.exports.getfind = getfind;
