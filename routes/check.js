const express = require("express");
const router = express.Router();
const checkController = require("../controllers/check/check-controller");
const db = require("../db/connect");

router.get("/check", checkController);
router.get("/checkdetail", checkController.getdetail);
router.get("/adminmanu", checkController.adminmanu);
router.get("/addcheck", checkController.getaddCheck);
router.post("/updatestatus", checkController.updateStatus);
router.post("/addcheck", checkController.postCheck);
router.post("/updatecheck", checkController.putStatusCheck);
router.post("/findcheck", checkController.postfind);
router.post("/findhischeck", checkController.findHis);
router.get("/checkfile/:perid", function getfilestaff(req, res) {
  const getperId = req.params.perid;
  const data = "select * from checkdel where id =" + `${getperId}`;
  console.log(data);
  db().query(data, (err, rs) => {
    console.log(rs[0].file);
    res.sendFile(__dirname + "/assest/checkInfo/" + `${rs[0].file}`);
  });
});

module.exports = router;
