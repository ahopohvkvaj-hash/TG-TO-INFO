import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// Root route - Render test ke liye
app.get("/", (req, res) => {
  res.send("🚀 Veer API is Live");
});

// Veer API route
app.get("/veer", async (req, res) => {
  const { tguid } = req.query;

  if (!tguid) {
    return res.status(400).json({ error: "tguid parameter missing" });
  }

  try {
    // Original API call
    const response = await axios.get(
      `http://meowmeow.rf.gd/gand/encoredaddy.php?tguid=${tguid}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
          "Accept": "*/*",
          "Referer": "https://google.com"
        },
        responseType: "text",
      }
    );

    // Response as HTML/text
    res.set("Content-Type", "text/html");
    res.send(response.data);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch upstream API" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Veer API running on port ${PORT}`);
});
