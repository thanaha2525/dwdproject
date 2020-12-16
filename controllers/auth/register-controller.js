const db = require("../../db/connect");
const md5 = require("md5");

const getRegister = (req, res, next) => {
  if (req.session.loggedin == true && req.session.status == 0) {
    res.render("addMember", {
      titel: "เพิ่มเจ้าหน้าที่",
      ms: " ",
      name: " ",
      sername: " ",
      perId: " ",
      username: " ",
      tel: " ",
      status: req.session.status,
      office: " "
    });
  } else {
    res.render("employLogin", {
      massage: "กรุณา Login ก่อนใช้งาน"
    });
  }
};

const postRegister = (req, res, next) => {
  if (req.session.loggedin == true && req.session.status == 0) {
    const name = req.body.name;
    const sername = req.body.sername;
    const perId = req.body.perId;
    const username = req.body.username;
    const photoIdCard = req.files.photo;
    const password = req.body.password;
    const tel = req.body.tel;
    const office = req.body.office;
    const comp = req.body.ConfirmPass;

    if (password == comp) {
      var hash = md5(password);
      const insertData = `INSERT INTO staff(perId, name, surname, tel, username, password,status,file,office) VALUES ('${perId}','${name}','${sername}','${tel}','${username}','${hash}',1,'${photoIdCard.name}','${office}')`;
      console.log(insertData);
      db().query(insertData, (err, rs) => {
        if (!err) {
          photoIdCard.mv(
            "./routes/assest/staffId/" + name + photoIdCard.name,
            function(err, result) {
              if (err) throw err;
              const data = "select * from `staff`";
              db().query(data, (err, rs) => {
                console.log(rs);
                res.render("memberPage", {
                  ms: "success",
                  status: req.session.status,
                  result: rs
                });
              });
            }
          );
        } else {
          res.render("addMember", {
            titel: "เพิ่มเจ้าหน้าที่",
            ms: "รหัสบัตรประชาชนหรือเลขพาสปอตนี้ใช้งานแล้ว",
            name: name,
            sername: sername,
            perId: perId,
            username: username,
            tel: tel,
            office: office
          });
        }
      });
    } else {
      res.render("addMember", {
        ms: "รหัสและการยืนยันรหัสผ่านไม่ถูกต้อง",
        name: name,
        sername: sername,
        perId: perId,
        username: username,
        tel: tel,
        office: office
      });
    }
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

const getchang = (req, res, next) => {
  if (req.session.loggedin == true && req.session.status == 0) {
    const name = req.body.name;
    const sername = req.body.sername;
    const perId = req.body.perId;
    const username = req.body.username;
    const tel = req.body.tel;
    const office = req.body.office;
    console.log(name);
    res.render("editMember", {
      titel: "แก้ไขเจ้าหน้าที่",
      ms: " ",
      name: name,
      sername: req.body.sername,
      perId: req.body.perId,
      username: req.body.username,
      tel: req.body.tel,
      office: req.body.office,
      status: req.session.status
    });
  } else {
    res.render("employLogin", { massage: "กรุณา Login ก่อนใช้งาน" });
  }
};

module.exports = getRegister;
module.exports.postRegister = postRegister;
module.exports.getchang = getchang;
