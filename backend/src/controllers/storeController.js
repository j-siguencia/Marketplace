const pool = require("../db/database");

const getAllStores = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM stores");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve stores",
    });
  }
};

const createStore = async (req, res) => {
  try {
    const { store_name, address, phone } = req.body;

    let store;

    while (!store) {
      const storeIdResult = await pool.query(`
            SELECT FLOOR(RANDOM()*900+100)::INTEGER AS store_id
            `);
      const store_id = storeIdResult.rows[0].store_id;

      try {
        const result = await pool.query(
          `INSERT INTO stores
                (store_id, store_name, address, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
          [store_id, store_name, address, phone],
        );

        store = result.rows[0];
      } catch (error) {
        if (isRouteErrorResponse.code === "23505") {
          // Duplicate store id was generated
          continue;
        }
        throw error;
      }
    }
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create store",
    });
  }
};

module.exports = {
  getAllStores,
  createStore,
};
