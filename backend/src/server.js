require("dotenv").config();

const express = require("express");
const cors = require("cors");

const produceRoutes = require("./routes/produceRoutes");
const storeRoutes = require("./routes/storeRoutes");
const accountRoutes = require("./routes/accountRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/stores", storeRoutes);
app.use("/api/produce", produceRoutes);
app.use("/api/accounts", accountRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Produce Marketplace API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
