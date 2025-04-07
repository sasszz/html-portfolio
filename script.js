const username = "sasszz";

fetch(`https://api.github.com/users/${username}`)
  .then((response) => response.json())
  .then((data) => {
    const avatar = document.createElement("img");
    avatar.src = data.avatar_url;
    avatar.width = 150;
    document.getElementById("avatar-container").appendChild(avatar);

    document.getElementById("bio").textContent =
      data.bio || "No bio available.";
    console.log(data);
  })
  .catch((error) => console.error("Error fetching GitHub data:", error));

const apiUrl = `https://api.github.com/users/${username}/followers`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((users) => {
    const container = document.getElementById("followers-grid");
    users.slice(0, 8).forEach((user) => {
      const card = document.createElement("a");
      card.href = user.html_url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = "flex flex-col items-center";

      card.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" class="w-32 h-32">
          <p class="text-sm">${user.login}</p>
        `;

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Failed to load following list:", error);
  });

const audio = document.getElementById("bg-music");
const toggleBtn = document.getElementById("sound-toggle");
const icon = document.getElementById("sound-icon");

let isPlaying = false;
audio.volume = 0.5;

toggleBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    icon.src = "./assets/imgs/mute.svg";
  } else {
    audio.play();
    icon.src = "./assets/imgs/sound.svg";
  }
  isPlaying = !isPlaying;
});

document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".timeline__block");

  const revealOnScroll = () => {
    blocks.forEach((block) => {
      const rect = block.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        block.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load
});
