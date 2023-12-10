const express = require("express");
const router = express.Router();
const stories = require("../Models/Stories");
const { route } = require("./auth");
const verify = require("../Middlewares/VerifyAuth");

router.get("/all-stories", async (req, res) => {
  try {
    const allStories = await stories.find({});
    res.json({ allStories });
  } catch (err) {
    console.log(err, "Couldnt find the jobs");
  }
});

router.get("/get-stories", async (req, res) => {
  try {
    const { category } = req.query;
    const findStories = await stories.find({
      category: { $regex: category, $options: "i" },
    });
    res.json({ message: "Success", findStories });
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
});

router.post("/add-stories", verify, async (req, res) => {
  try {
    const payload = req.body;
    const addStory = await stories.create(payload);
    res.json({ message: "Story added successfully" });
  } catch (err) {
    console.log(err, "Couldnt add the story");
  }
});

router.put("/edit-story/:storyId", verify, async (req, res) => {
  try {
    const { heading, description, image, category } = req.body;
    const { storyId } = req.params;
    // console.log(storyId);
    const updateStory = await stories.updateOne(
      { _id: storyId },
      { $set: { heading, description, image, category } }
    );
    res.json({ message: "Story edited successfully", updateStory });
  } catch (err) {
    console.log(err, "Couldnt update the story");
  }
});
router.get("/bookmarked-story/:id", verify, async (req, res) => {
  try {
    const { storyId } = req.params;
    const bookmarkedStory = await stories.findOne({ storyId });
    res.json({ message: "Success", bookmarkedStory });
  } catch (error) {
    console.log(error, "Couldnt find the story");
  }
});

module.exports = router;
