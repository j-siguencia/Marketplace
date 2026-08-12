const pool = require("../db/database");
const bcrypt = require("bcrypt");

const registerAccount = async (req, res) => {
  try {
    const { email, password, store_id } = req.body;

    const storeResult = await pool.query(
      "SELECT store_id FROM stores WHERE store_id = $1",
      [store_id],
    );
    if (storeResult.rows.length === 0) {
      return res.status(400).json({
        error: "Invalid Store ID",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO accounts
            (email, password_hash, store_id)
        VALUES ($1, $2, $3)
        RETURNING account_id, email, store_id
        `,
      [email, passwordHash, store_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create account",
    });
  }
};

module.exports = {
  registerAccount,
};
