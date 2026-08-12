const pool = require("../db/database");

const getAllProduce = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produce");

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve produce",
    });
  }
};

module.exports = {
  getAllProduce,
};
