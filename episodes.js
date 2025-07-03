let watchedEpisodes = new Set();
const totalEpisodes = 24;

async function loadProgressFromBackend() {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  try {
    const res = await fetch("https://treata-yug.onrender.com/get-progress", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();
    if (res.ok) {
      watchedEpisodes = new Set(data.episodesWatched);
      updateProgressUI();
    }
  } catch (err) {
    console.error("Error loading progress from backend:", err);
  }
}


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
    console.error("Error saving progress to backend:", err);
  }
}

function saveProgressLocally() {
  localStorage.setItem("watchedEpisodes", JSON.stringify([...watchedEpisodes]));
}

function updateProgressUI() {
  const watchedCount = watchedEpisodes.size;
  const percentage = (watchedCount / totalEpisodes) * 100;
  document.getElementById("episodesWatched").innerText = watchedCount;
  document.getElementById("progressBar").style.width = percentage + "%";
}

function trackProgress(video, episodeNumber) {
  if (!video) return;

  video.addEventListener("ended", () => {
    if (!watchedEpisodes.has(episodeNumber)) {
      watchedEpisodes.add(episodeNumber);
      updateProgressUI();
      saveProgressLocally();
      saveProgressToBackend(episodeNumber);
    }
  });

  // Optional: handle skipping to end
  video.addEventListener("seeked", () => {
    if (
      video.duration > 0 &&
      video.currentTime >= video.duration - 2 &&
      !watchedEpisodes.has(episodeNumber)
    ) {
      watchedEpisodes.add(episodeNumber);
      updateProgressUI();
      saveProgressLocally();
      saveProgressToBackend(episodeNumber);
    }
  });
}

// Searchbar functionality
document.getElementById("searchbox").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    let input = document.getElementById("searchbox").value.trim();
    let episodeNumber = parseInt(input);

    if (episodeNumber > 24) {
      alert("Episode not yet released. Coming soon 😊");
    } else if (!isNaN(episodeNumber) && episodeNumber >= 1 && episodeNumber <= 24) {
      let episodeId = "episode" + episodeNumber;
      let episodeElement = document.getElementById(episodeId);

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

document.addEventListener("DOMContentLoaded", () => {
  // Load local progress first
  updateProgressUI(); // show initial 0% or empty UI
loadProgressFromBackend(); // will fetch correct episodes from server


  // Load server-side progress after DOM ready
  loadProgressFromBackend();

  // Attach listeners to all videos
  for (let i = 1; i <= totalEpisodes; i++) {
    const video = document.getElementById("video" + i);
    trackProgress(video, i);
  }
});
