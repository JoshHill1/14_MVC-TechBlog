const fs = require("fs");
const path = require("path");
const { Comment } = require("../models");

const seedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "seedData.json"), "utf8")
);

const seedDatabase = async () => {
  await Comment.bulkCreate(seedData.comments);
  process.exit(0);
};

seedDatabase();
