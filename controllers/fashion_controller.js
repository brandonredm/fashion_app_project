const express = require("express");
const fashion = express.Router();
const Fashion = require("../models/fashion.js");
// const fashionSeed = require("../models/fashion_seed.js");

fashion.get("/", (req, res) => {
  Fashion.find({}, (err, foundFashion) => {
    res.json(foundFashion);
  });
});

fashion.post("/", (req, res) => {
  // create a Fashion
  Fashion.create(req.body, (err, createdFashion) => {
    //find all the Fashion
    Fashion.find({}, (err, foundFashion) => {
      //return json of all Fashion
      res.json(foundFashion);
    });
  });
});

fashion.put("/:id", (req, res) => {
  Fashion.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedFashion) => {
      if (err) {
        res.send(err);
      } else {
        Fashion.find({}, (err, foundFashion) => {
          res.json(foundFashion);
        });
      }
    }
  );
});

fashion.delete("/:id", (req, res) => {
  Fashion.findByIdAndRemove(req.params.id, (err, deletedFashion) => {
    Fashion.find({}, (err, foundFashion) => {
      res.json(foundFashion);
    });
  });
});

// fashion.get("/seed", (req, res) => {
//   Fashion.insertMany(fashionSeed, (err, manyFashion) => {
//     res.redirect("/");
//   });
// });

fashion.get("/dropcollection", (req, res) => {
  Fashion.collection.drop();
  res.redirect("/");
});

module.exports = fashion;
