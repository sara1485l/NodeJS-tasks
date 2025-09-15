const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Auth Service Error", details: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Auth Service Error", details: err.message });
  }
});

router.post("/otp", async (req, res) => {
  try {
    const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Auth Service Error", details: err.message });
  }
});

router.post("/new-pass", async (req, res) => {
  try {
    const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/new-pass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Auth Service Error", details: err.message });
  }
});


router.post("/groups/create", async (req, res) => {
  try {
    const response = await fetch(`${process.env.GROUP_SERVICE_URL}/groups/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": req.headers["authorization"] || "",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Group Service Error", details: err.message });
  }
});

router.get("/groups/get/:id", async (req, res) => {
  try {
    const response = await fetch(`${process.env.GROUP_SERVICE_URL}/groups/get/${req.params.id}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Group Service Error", details: err.message });
  }
});



router.post("/reels/create", async (req, res) => {
  try {
    const response = await fetch(`${process.env.REEL_SERVICE_URL}/reels/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": req.headers["authorization"] || "",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Reel Service Error", details: err.message });
  }
});

router.get("/reels/get/:id", async (req, res) => {
  try {
    const response = await fetch(`${process.env.REEL_SERVICE_URL}/reels/get/${req.params.id}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Reel Service Error", details: err.message });
  }
});



router.post("/posts/add-new-post", async (req, res) => {
  try {
    const response = await fetch(`${process.env.POST_SERVICE_URL}/posts/add-new-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": req.headers["authorization"] || "",
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Post Service Error", details: err.message });
  }
});

router.get("/posts/get-post/:id", async (req, res) => {
  try {
    const response = await fetch(`${process.env.POST_SERVICE_URL}/posts/get-post/${req.params.id}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Post Service Error", details: err.message });
  }
});

router.get("/posts/get-posts-by-user/:userId", async (req, res) => {
  try {
    const response = await fetch(`${process.env.POST_SERVICE_URL}/posts/get-posts-by-user/${req.params.userId}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Post Service Error", details: err.message });
  }
});

router.delete("/posts/delete-post/:id", async (req, res) => {
  try {
    const response = await fetch(`${process.env.POST_SERVICE_URL}/posts/delete-post/${req.params.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": req.headers["authorization"] || ""
      }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Post Service Error", details: err.message });
  }
});

module.exports = router;
