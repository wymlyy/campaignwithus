const express = require('express');
const router = express.Router();
const { Posts, Signatures } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Signatures] });
  const signedPosts = await Signatures.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, signedPosts: signedPosts });
});

router.get("/visitors", async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Signatures] });
  const signedPosts = await Signatures.findAll();
  res.json({ listOfPosts: listOfPosts, signedPosts: signedPosts });
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED");
});

module.exports = router;