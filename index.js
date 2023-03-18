const express = require("express");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const coursesRoutes = require("./routes/courses");
const cardRoutes = require("./routes/card");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

//! set handlebars
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("hbs", hbs.engine); //registrate handlebar's engine in express
app.set("view engine", "hbs"); //use handlebars
app.set("views", "views");
//! end set hbs

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3000;

const PASSWORD = "03nIvIXeSOCK2rKd";

async function start() {
  try {
    const url = `mongodb+srv://hryvaihor422:${PASSWORD}@cluster0.os60ogr.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(url);
    app.listen(PORT, () => {
      console.log(`Server has been running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
