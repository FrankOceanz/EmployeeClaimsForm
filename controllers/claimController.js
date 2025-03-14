const Claim = require("../models/claim");

// Get all claims for the logged-in user
exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.findAll({ where: { userId: req.user.id } });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new claim
exports.createClaim = async (req, res) => {
  const { amount, description } = req.body;
  try {
    const claim = await Claim.create({ userId: req.user.id, amount, description });
    res.status(201).json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a claim
exports.updateClaim = async (req, res) => {
  const { id } = req.params;
  const { amount, description } = req.body;
  try {
    let claim = await Claim.findOne({ where: { id, userId: req.user.id } });
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    claim.amount = amount;
    claim.description = description;
    await claim.save();

    res.json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a claim
exports.deleteClaim = async (req, res) => {
  const { id } = req.params;
  try {
    const claim = await Claim.findOne({ where: { id, userId: req.user.id } });
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    await claim.destroy();
    res.json({ message: "Claim deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve a claim (Admin only)
exports.approveClaim = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  const { id } = req.params;
  try {
    let claim = await Claim.findOne({ where: { id } });
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    claim.status = "approved";
    await claim.save();

    res.json({ message: "Claim approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject a claim (Admin only)
exports.rejectClaim = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  const { id } = req.params;
  try {
    let claim = await Claim.findOne({ where: { id } });
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    claim.status = "rejected";
    await claim.save();

    res.json({ message: "Claim rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
