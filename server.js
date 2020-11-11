const express = require("express");
const router = require("./src/router/routes");
require("dotenv").config();

const app = express();

app.use("/api/v1", router);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
