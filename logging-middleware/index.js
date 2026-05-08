const axios = require("axios");
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;


app.post("/log", async (req, res) => {
  const { stack, level, package: packageName, message } = req.body;
    try {
        logResponse = await Log(stack, level, packageName, message);
        res.status(200).json(logResponse);
    } catch (error) {
        res.status(500).json({ error: "Logging Failed" });
    }
});


app.listen(PORT, () => {
  console.log(`Logging Middleware running on port ${PORT}`);
});