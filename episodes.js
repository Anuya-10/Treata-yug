document.getElementById("searchbox").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {  // Search only when Enter is pressed
      let input = document.getElementById("searchbox").value.trim();
      let episodeNumber = parseInt(input);
     
      if (episodeNumber > 24) {
        alert('Episode not yet released. Coming soon 😊');
      } else if (!isNaN(episodeNumber) && episodeNumber >= 1 && episodeNumber <= 24) { 
        let episodeId = "episode" + episodeNumber;
        let episodeElement = document.getElementById(episodeId);
        
        if (episodeElement) {
            // scroll to searched episode 
          episodeElement.scrollIntoView({ behavior: "smooth", block: "start" });
          // adding highlight effect
          episodeElement.classList.add("highlight");
          //remove highlight after clicking
          setTimeout(() => {
            episodeElement.classList.remove("highlight");
        }, 4000);
        }
      }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let episodesWatched = 0;
    let totalEpisodes = 24;

    function updateProgress(episodeNumber) {
        if (episodesWatched < episodeNumber) {
            episodesWatched = episodeNumber;
        }

        // Update progress bar width
        let progressPercentage = (episodesWatched / totalEpisodes) * 100;
        document.getElementById("progressBar").style.width = progressPercentage + "%";
        // update watched episode count 
        document.getElementById("episodesWatched").innerText = episodesWatched;
    }

    function trackProgress(video, episodeNumber) {
        if (!video) return; // Ensure video exists

        video.addEventListener("timeupdate", function () {
            if (video.duration > 0) {
                let progress = (video.currentTime / video.duration) * 100;
                document.getElementById("progressBar").style.width = progress + "%";
            }
        });

        video.addEventListener("ended", function () {
            updateProgress(episodeNumber);
        });

        video.addEventListener("seeked", function () {
            let duration = video.duration;
            let currentTime = video.currentTime;

            // If user skips near the end, mark the episode as watched
            if (duration > 0 && currentTime >= duration - 2) {
                updateProgress(episodeNumber);
            }
        });
    }

    for (let i = 1; i <= totalEpisodes; i++) {
        let videoElement = document.getElementById("video" + i); // Correcting reference
        trackProgress(videoElement, i);
    }

    // Initialize Progress UI
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("episodesWatched").innerText = "0";
});

