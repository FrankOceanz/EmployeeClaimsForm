const express = require("express");
const { getClaims, createClaim, updateClaim, deleteClaim, approveClaim, rejectClaim } = require("../controllers/claimController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware); // Protect all routes

router.get("/", getClaims);
router.post("/", createClaim);
router.put("/:id", updateClaim);
router.delete("/:id", deleteClaim);
router.post("/:id/approve", approveClaim);
router.post("/:id/reject", rejectClaim);

module.exports = router;
