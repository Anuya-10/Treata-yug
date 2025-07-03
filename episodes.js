let watchedEpisodes = new Set();
const totalEpisodes = 24;

// ✅ Load from backend using auth token
async function loadProgressFromBackend() {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  try {
    const res = await fetch("https://treata-yug.onrender.com/get-progress", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!res.ok) {
      console.error("Failed to load progress");
      return;
    }

    const data = await res.json();
    watchedEpisodes = new Set(data.episodesWatched); // 👈 Set correct data
    updateProgressUI(); // ✅ Only call AFTER data is loaded
  } catch (err) {
    console.error("Error loading progress:", err);
  }
}

// ✅ Save episode when watched
async function saveProgressToBackend(episodeNumber) {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  try {
    await fetch("https://treata-yug.onrender.com/save-progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ episodeNumber })
    });
  } catch (err) {
    console.error("Error saving progress:", err);
  }
}

// ✅ Update UI
function updateProgressUI() {
  const watchedCount = watchedEpisodes.size;
  const percentage = (watchedCount / totalEpisodes) * 100;
  document.getElementById("episodesWatched").innerText = watchedCount;
  document.getElementById("progressBar").style.width = percentage + "%";
}

// ✅ Track individual video progress
function trackProgress(video, episodeNumber) {
  if (!video) return;

  function markWatched() {
    if (!watchedEpisodes.has(episodeNumber)) {
      watchedEpisodes.add(episodeNumber);
      updateProgressUI();
      saveProgressToBackend(episodeNumber);
    }
  }

  video.addEventListener("ended", markWatched);
  video.addEventListener("seeked", () => {
    if (video.duration > 0 && video.currentTime >= video.duration - 2) {
      markWatched();
    }
  });
}

// ✅ Search functionality
document.getElementById("searchbox").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const input = document.getElementById("searchbox").value.trim();
    const episodeNumber = parseInt(input);

    if (episodeNumber > 24) {
      alert("Episode not yet released. Coming soon 😊");
      return;
    }

    if (!isNaN(episodeNumber) && episodeNumber >= 1 && episodeNumber <= 24) {
      const episodeId = "episode" + episodeNumber;
      const episodeElement = document.getElementById(episodeId);

      if (episodeElement) {
        episodeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        episodeElement.classList.add("highlight");
        setTimeout(() => {
          episodeElement.classList.remove("highlight");
        }, 4000);
      }
    }
  }
});

// ✅ DOM Content Load
document.addEventListener("DOMContentLoaded", async () => {
  await loadProgressFromBackend(); // ✅ Wait for backend
  for (let i = 1; i <= totalEpisodes; i++) {
    const video = document.getElementById("video" + i);
    trackProgress(video, i);
  }
});
