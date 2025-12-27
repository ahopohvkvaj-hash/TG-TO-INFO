import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Veer API is Live");
});

// Veer API route
app.get("/veer", async (req, res) => {
  const { tguid } = req.query;

  if (!tguid) {
    return res.status(400).json({ success: false, error: "tguid parameter missing" });
  }

  try {
    const response = await axios.get(
      `http://meowmeow.rf.gd/gand/encoredaddy.php?tguid=${tguid}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "application/json",
          "Referer": "https://google.com"
        },
        responseType: "json", // JSON mode
      }
    );

    // Forward JSON response directly
    res.json(response.data);

  } catch (err) {
    console.error("Upstream API fetch failed:", err.message);
    res.status(500).json({ success: false, error: "Failed to fetch upstream API" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Veer API running on port ${PORT}`);
});
