const express = require("express");
const cors = require("cors"); // Import CORS

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

app.get("/", (req, res) => {
  res.send("Welcome to the Mood-Based Music Player API!");
});

// Mood-based songs
const moodSongs = {
  happy: ["Happy - Pharrell Williams", "Can't Stop the Feeling - Justin Timberlake", "Good Life - Kanye West", "Walking on Sunshine - Katrina & The Waves", "Best Day of My Life - American Authors"],
  sad: ["Someone Like You - Adele", "Fix You - Coldplay", "Yesterday - The Beatles", "The Night We Met - Lord Huron", "When I Was Your Man - Bruno Mars"],
  energetic: ["Eye of the Tiger - Survivor", "Stronger - Kanye West", "Lose Yourself - Eminem", "Thunderstruck - AC/DC", "We Will Rock You - Queen"],
  calm: ["Weightless - Marconi Union", "Clair de Lune - Debussy", "River Flows in You - Yiruma", "Sunset Lover - Petit Biscuit", "Opus 23 - Dustin O'Halloran"],
  romantic: ["Perfect - Ed Sheeran", "All of Me - John Legend", "Thinking Out Loud - Ed Sheeran", "Can't Help Falling in Love - Elvis Presley", "You Are the Reason - Calum Scott"],
  workout: ["Till I Collapse - Eminem", "Power - Kanye West", "Remember The Name - Fort Minor", "Stronger - Daft Punk", "Can't Hold Us - Macklemore & Ryan Lewis"],
  nostalgic: ["Boulevard of Broken Dreams - Green Day", "Viva La Vida - Coldplay", "Teenage Dirtbag - Wheatus", "I Miss You - Blink-182", "Stacy’s Mom - Fountains of Wayne"],
  relaxing: ["Banana Pancakes - Jack Johnson", "Better Together - Jack Johnson", "Gravity - John Mayer", "Lost Stars - Adam Levine", "Holocene - Bon Iver"]
};

// Function to handle typos
const findClosestMood = (input) => {
  const moods = Object.keys(moodSongs);
  input = input.toLowerCase();
  return moods.find(m => m.startsWith(input)) || moods.find(m => m.includes(input)) || null;
};

// API Endpoint
app.get("/playlist", (req, res) => {
  let mood = req.query.mood?.toLowerCase().trim();
  console.log("Received mood:", mood);

  if (!mood) {
    return res.json({ songs: ["Please enter a mood!"] });
  }

  const matchedMood = findClosestMood(mood);
  const songs = matchedMood ? moodSongs[matchedMood] : ["No songs found for this mood."];

  res.json({ songs });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
