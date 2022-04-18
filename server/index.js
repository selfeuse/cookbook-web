const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

dotenv.config();

const db = require("./db/db.init");

//const usersRouter = require('./routes/users');

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//db.sequelize.sync({ force: true });
db.sequelize.sync();

require("./routes/users.js")(app);
require("./routes/recipes.js")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
