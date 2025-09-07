const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.post("/post", controller.createAppointment);
router.get("/get", controller.getAppointments);
router.put("/put", controller.updateAppointment);
router.delete("/delete", controller.deleteAppointment);
router.get('/available-times', controller.getAvailableTimesGroupedByDate);

module.exports = router;
