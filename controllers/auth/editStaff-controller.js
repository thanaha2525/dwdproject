const db = require("../../db/connect");
var md5 = require("md5");

const getEditStaff = (req, res, next) => {
  if (req.session.loggedin == true && req.session.status == 0) {
    console.log(req.session.status);
    const data = "select * from staff";
    db().query(data, (err, rs) => {
      res.render("memberPage", { result: rs, status: req.session.status });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const profile = (req, res) => {
  if (req.session.loggedin == true) {
    const perId = req.session.perId;
    const data = `select * from staff where perId = '${perId}'`;
    db().query(data, (err, rs) => {
      res.render("profilePage", { result: rs, status: req.session.status });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const editprofile = (req, res) => {
  if (req.session.loggedin == true) {
    const perId = req.session.perId;
    const data = `select * from staff where perId = '${perId}'`;
    console.log(data);
    db().query(data, (err, rs) => {
      res.render("changprofile", {
        result: rs,
        status: req.session.status,
        titel: "แก้ไขโปรไฟล์",
        ms: " ",
        name: rs[0].name,
        sername: rs[0].surname,
        tel: rs[0].tel,
        perId: rs[0].perId
      });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const getchangpassword = (req, res) => {
  if (req.session.loggedin == true) {
    res.render("changpass", {
      ms: "",
      titel: "เปลี่ยนรหัสผ่าน",
      status: req.session.status
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const postchangpassword = (req, res) => {
  if (req.session.loggedin == true) {
    const oldpass = req.body.oldpass;
    const newpass = req.body.newpass;
    const connewpass = req.body.connewpass;
    const perId = req.session.perId;

    const hasholdpass = md5(oldpass);
    const hashnewpass = md5(newpass);
    const hashconnewpass = md5(connewpass);

    const data = "select password from staff where perId = " + `'${perId}'`;
    db().query(data, (err, rs) => {
      if (!err) {
        console.log(rs[0].password);
        if (hasholdpass == rs[0].password) {
          if (hashnewpass == hashconnewpass) {
            const newdat = `update staff set password='${hashnewpass}' where perId = '${perId}'`;
            console.log(newdat);
            db().query(newdat, (err, rs) => {
              if (!err) {
                res.redirect("/profile");
              }
            });
          } else {
            res.render("changpass", {
              ms: "**กรอกรหัสผ่านไม่ตรงกัน",
              titel: "เปลี่ยนรหัสผ่าน",
              status: req.session.status
            });
          }
        } else {
          res.render("changpass", {
            ms: "**รหัสผ่านเก่าไม่ถูกต้อง",
            titel: "เปลี่ยนรหัสผ่าน",
            status: req.session.status
          });
        }
      }
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const putStaff = (req, res, next) => {
  if (req.session.loggedin == true && req.session.status == 0) {
    const editName = req.body.name;
    const editSurname = req.body.sername;
    const tel = req.body.tel;
    const username = req.body.username;
    const office = req.body.office;
    const perId = req.body.perId;
    const putData = `UPDATE staff SET name='${editName}',surname='${editSurname}',tel='${tel}',username='${username}',office='${office}' where perId = '${perId}' `;
    db().query(putData, (err, rs) => {
      console.log(putData);
      if (err)
        throw res.send({ page: "editStaff", status: "cannot edit staff" });
      const data = "select * from staff";
      db().query(data, (err, rs) => {
        res.render("memberPage", { result: rs, status: req.session.status });
      });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const putAuth = (req, res, next) => {
  if (req.session.loggedin == true && req.session.status == 0) {
    const perId = req.body.perId;
    const password = req.body.password;
    const hashPassword = md5(password);
    const updateData = `UPDATE staff SET password='${hashPassword}' where perId = '${perId}'`;
    db().query(updateData, (err, rs) => {
      res.send({ rs });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const delStaff = (req, res, next) => {
  if (req.session.loggedin == true && req.session.status == 0) {
    const perId = req.body.perId;
    const delData = `DELETE FROM staff where perId = '${perId}'`;
    console.log(delData);
    db().query(delData, (err, rs) => {
      console.log(rs);
      const data = "select * from staff";
      db().query(data, (err, rs) => {
        res.render("memberPage", { result: rs, status: req.session.status });
      });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const postupdateprofile = (req, res, next) => {
  if (req.session.loggedin == true) {
    const name = req.body.name;
    const sername = req.body.sername;
    const tel = req.body.tel;
    const perId = req.session.perId;

    const data =
      "update `staff` set `name`=" +
      `'${name}'` +
      "," +
      "`surname`=" +
      `'${sername}'` +
      "," +
      "`tel`=" +
      `'${tel}'` +
      "where perId =" +
      `'${perId}'`;
    console.log(data);
    db().query(data, (err, rs) => {
      const data = `select * from staff where perId = '${perId}'`;
      db().query(data, (err, rs) => {
        res.render("profilePage", { result: rs, status: req.session.status });
      });
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

module.exports = getEditStaff;
module.exports.putStaff = putStaff;
module.exports.putAuth = putAuth;
module.exports.delStaff = delStaff;
module.exports.profile = profile;
module.exports.editprofile = editprofile;
module.exports.postupdateprofile = postupdateprofile;
module.exports.postchangpassword = postchangpassword;
module.exports.getchangpassword = getchangpassword;
