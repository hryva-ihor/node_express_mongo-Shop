const { Router } = require("express");
const Course = require("../models/course");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add courses",
    isAdd: true,
  });
});

router.post("/", async (req, res) => {
  res.redirect("/courses");
  // const course = new Course(req.body.title, req.body.price, req.body.imgUrl);
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.imgUrl,
  });

  try {
    await course.save();
    res.redirect("/course");
  } catch (e) {
    console.log(e);
  }

  await course.save();
});

module.exports = router;
