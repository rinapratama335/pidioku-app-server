const express = require("express");
const router = require("./src/router/routes");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", router);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
