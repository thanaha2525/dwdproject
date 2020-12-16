const db = require("../../db/connect");
const date = require("../../utility/date");

const getCheck = (req, res, next) => {
  if (req.session.loggedin == true) {
    const getData =
      "SELECT * FROM `check` where status = 'รอจ่าย' order by id desc";
    db().query(getData, (err, rs) => {
      console.log(rs);
      res.render("checkManagement", {
        status: req.session.status,
        username: req.session.name,
        result: rs
      });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const adminmanu = (req, res, next) => {
  if (req.session.loggedin == true) {
    res.render("adminMenu", {
      status: req.session.status,
      username: req.session.name
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const postCheck = (req, res, next) => {
  if (req.session.loggedin == true) {
    const name = req.body.name;
    const payBefore = req.body.payBefore;
    const count = req.body.count;
    const payDate = req.body.payDate;
    const updateDate = date();
    const price = req.body.price;
    const createdBy = req.session.username;
    const status = req.body.status;
    const contact = req.body.contact;

    const insertData =
      "INSERT INTO `check` (`name`,`payBefore`,`payDate`,`updateDate`,`price`,`createdBy`,`count`,`status`,`contact`) VALUES " +
      `('${name}'` +
      "," +
      `'${payBefore}'` +
      "," +
      `'${payDate}'` +
      "," +
      `'${updateDate}'` +
      "," +
      `${price}` +
      "," +
      `'${createdBy}'` +
      "," +
      `${count}` +
      "," +
      `'${status}'` +
      "," +
      `'${contact}'` +
      ")";

    db().query(insertData, (err, rs) => {
      if (rs) {
        res.redirect("/check");
      } else {
        res.send({ err });
      }
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const putStatusCheck = (req, res, next) => {
  if (req.session.loggedin == true) {
    const id = req.body.id;
    const status = req.body.status;
    const data =
      "UPDATE `check` SET `status`=" + `'${status}' where id = ${id}`;
    db().query(data, (err, rs) => {
      if (err) {
        res.send({ err });
      } else {
        const d = `select * from` + " `check` " + `where id = ${id}`;
        db().query(d, (err, result) => {
          const status = result[0].status;

          if (
            status == "สำเร็จ" ||
            status == "ยกเลิก" ||
            status == "เกินกำหนด"
          ) {
            const newData = {
              id: result[0].id,
              name: result[0].name,
              payDate: date(),
              updateDate: result[0].updateDate,
              createdBy: result[0].createdBy,
              sa: req.files.file,
              status: result[0].status,
              price: result[0].price,
              updateDate: date(),
              nameMessenger: req.body.massenger,
              count: result[0].count
            };

            const del = "DELETE FROM `check` WHERE id = " + `'${id}'`;
            const innewdata =
              "INSERT INTO `checkdel`(`name`, `payDate`, `updateDate`,   `createdBy`, `file`, `status`, `nameMessenger`,price,count) VALUES(" +
              `'${newData.name}'` +
              "," +
              `'${newData.payDate}'` +
              "," +
              `'${newData.updateDate}'` +
              "," +
              `'${newData.createdBy}'` +
              "," +
              `'${newData.id}${newData.sa.name}'` +
              "," +
              `'${newData.status}'` +
              "," +
              `'${newData.nameMessenger}'` +
              "," +
              `${newData.price}` +
              "," +
              `${newData.count})`;
            console.log(innewdata);
            db().query(innewdata, (err, rs) => {
              if (!err) {
                db().query(del, (err, rs) => {
                  const sa = req.files.file;
                  if (!err) {
                    sa.mv(
                      "./routes/assest/checkInfo/" + newData.id + sa.name,
                      function(err) {
                        if (!err) {
                          const data = "select * from checkdel";
                          db().query(data, (err, rs) => {
                            res.render("historyCheck", {
                              status: req.session.status,
                              result: rs
                            });
                          });
                        } else {
                          res.send("error", err);
                        }
                      }
                    );
                  } else {
                    res.send("error", err);
                  }
                });
              } else {
                res.send("error", err);
              }
            });
          }
        });
      }
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const getdetail = (req, res, next) => {
  if (req.session.loggedin == true) {
    const data = "select * from checkdel order by id desc";
    db().query(data, (err, rs) => {
      res.render("historyCheck", {
        status: req.session.status,
        username: req.session.name,
        result: rs
      });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const postfind = (req, res) => {
  if (req.session.loggedin == true) {
    const find = req.body.find;
    const getData = "SELECT * FROM `check` WHERE `name` = " + `'${find}'`;
    db().query(getData, (err, rs) => {
      res.render("checkManagement", {
        result: rs,
        status: req.session.status,
        username: req.session.name
      });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const getaddCheck = (req, res) => {
  if (req.session.loggedin == true) {
    res.render("addCheck", { status: req.session.status });
  } else {
    res.render("employLogin", {
      massage: "กรุณา Login ก่อนใช้งาน"
    });
  }
};

const updateStatus = (req, res) => {
  if (req.session.loggedin == true) {
    const id = req.body.id;
    const data = "select * from `check` where id =" + `${id}`;
    db().query(data, (err, rs) => {
      res.render("updateCheck", { result: rs, status: req.session.status });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const findHis = (req, res) => {
  if (req.session.loggedin == true) {
    const find = req.body.find;
    const getData = "SELECT * FROM `checkdel` WHERE `name` = " + `'${find}'`;
    db().query(getData, (err, rs) => {
      res.render("historyCheck", {
        result: rs,
        status: req.session.status,
        username: req.session.name
      });
      console.log(getData);
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

module.exports = getCheck;
module.exports.postCheck = postCheck;
module.exports.putStatusCheck = putStatusCheck;
module.exports.getdetail = getdetail;
module.exports.adminmanu = adminmanu;
module.exports.postfind = postfind;
module.exports.getaddCheck = getaddCheck;
module.exports.updateStatus = updateStatus;
module.exports.findHis = findHis;
