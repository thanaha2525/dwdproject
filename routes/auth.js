const express = require("express");
const router = express.Router();
const db = require("../db/connect");

const loginController = require("../controllers/auth/login-controller");
const registerController = require("../controllers/auth/register-controller");
const editStaffController = require("../controllers/auth/editStaff-controller");

router.get("/login", loginController);
router.post("/login", loginController.postLogin);
router.get("/logout", loginController.logout);
router.get("/register", registerController);
router.post("/changestaff", registerController.getchang);
router.get("/profile", editStaffController.profile);
router.post("/editprofile", editStaffController.editprofile);
router.post("/updateprofile", editStaffController.postupdateprofile);
router.post("/register", registerController.postRegister);
router.post("/editStaff", editStaffController.putStaff);
router.post("/editPassword", editStaffController.putAuth);
router.post("/delStaff", editStaffController.delStaff);
router.post("/passchang", editStaffController.postchangpassword);
router.get("/editstaff", editStaffController);
router.get("/openfile/:perid", function getfilestaff(req, res) {
  const getperId = req.params.perid;
  const data = "select * from staff where perId =" + `'${getperId}'`;
  console.log(data);
  db().query(data, (err, rs) => {
    console.log(rs[0].file);
    res.sendFile(__dirname + "/assest/staffId/" + `${rs[0].name}${rs[0].file}`);
  });
});
router.get("/changpassword", editStaffController.getchangpassword);

module.exports = router;
