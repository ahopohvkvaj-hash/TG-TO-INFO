import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/veer", async (req, res) => {
  const { tguid } = req.query;

  if (!tguid) {
    return res.status(400).json({ error: "tguid required" });
  }

  try {
    const response = await axios.get(
      `http://meowmeow.rf.gd/gand/encoredaddy.php?tguid=${tguid}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml",
          "Referer": "https://google.com"
        },
      }
    );

    res.send(response.data);
  } catch (err) {
    res.status(500).json({ error: "API fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
