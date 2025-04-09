const today = new Date();
const formattedDate = today.toLocaleDateString("en-US"); // MM/DD/YYYY
const lastLoginEl = document.getElementById("last-login");

if (lastLoginEl) {
  lastLoginEl.textContent = `Last login: ${formattedDate}`;
}

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
    const isMobile = window.innerWidth < 640;
    const limit = isMobile ? 4 : 8;

    const limitedUsers = users.slice(0, limit);

    if (limitedUsers.length === 0) {
      container.innerHTML = `<p class="col-span-full text-center text-gray-600">No followers found.</p>`;
      return;
    }

    limitedUsers.forEach((user) => {
      const card = document.createElement("a");
      card.href = user.html_url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = "flex flex-col items-center";

      card.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" class="w-32 h-32 rounded-full border-[3px] border-black">
        <p class="text-sm mt-2">${user.login}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch((error) => {
    const container = document.getElementById("followers-grid");
    container.innerHTML = `<p class="col-span-full">Failed to load followers.</p>`;
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

// const projectUrls = [
//   "https://www.youtube.com/embed/uvFWDvMrdOI",
//   "https://www.youtube.com/embed/9gsvTaoNp78",
//   "https://www.youtube.com/embed/1XbPDIqSQ8g",
// ];

const projects = [
  {
    videoUrl: "https://www.youtube.com/embed/uvFWDvMrdOI",
    title: "Integer Calculator Terminal Program",
    techStack: "Xcode, Assembly Language, Stack_8e Emulator",
    description:
      "An integer calculator in Stack_8e assembly that uses IO routines to clear, add, subtract, and optionally multiply/divide a memory variable via user input.",
    sourceCode:
      "https://github.com/sasszz/spring-classes-gcc-2024/tree/main/CS166/labs/lab2",
  },
  {
    videoUrl: "https://www.youtube.com/embed/9gsvTaoNp78",
    title: "Habit Tracker Web Program",
    techStack:
      "React, Next.js, TailwindCSS, TypeScript, Apollo, GraphQL, SQLite",
    description:
      "Built a responsive React/Next.js frontend featuring a retractable sidebar, dynamic page routing, an email subscription form with validation, unit testing with Jest, and real-time display of saved emails using Apollo Client.",
    sourceCode: "https://github.com/sasszz/habithero",
  },
  {
    videoUrl: "https://www.youtube.com/embed/1XbPDIqSQ8g",
    title: "Self-Custody Crypto Wallet",
    techStack:
      "React, TypeScript, TailwindCSS, Node.js, Express, MongoDB, Etherscan API",
    description:
      "Built a crypto wallet with mnemonic secret key generation and login, QR code wallet address, ETH/USD balance, and transaction history via Etherscan.",
    sourceCode: "https://github.com/sasszz/not-coinbase-wallet-",
  },
  {
    videoUrl: "https://www.youtube.com/embed/dYkyHfnVZXo ",
    title: "GDI Hackathon - Note to Chef",
    techStack:
      "React, Javascript, TailwindCSS",
    description:
      "Note to Chef is a tool to assist with planning for a variety of dietary needs by curating a collection of recipes that accommodates the user's requested dietary preferences.",
    sourceCode: "https://github.com/tinalr/recipebox-gdihackathon2022",
  },
  {
    videoUrl: "https://www.youtube.com/embed/2uBh8MiG7jk ",
    title: "GDI Hackathon - ClassConnect",
    techStack:
      "React, Javascript, Vite, TailwindCSS, NodeJS, MongoDB, Express",
    description:
      "ClassConnect is a fullstack MERN application designed to enhance classroom engagement by enabling real-time video conferencing and collaboration, giving teachers and students an interactive virtual space for remote learning.",
    sourceCode: "https://github.com/sasszz/classroom-connect-mern",
  },
];

let currentProjectIndex = 0;

function updateProject(index) {
  const project = projects[index];
  const iframe = document.getElementById("projectFrame");
  const infoDiv = document.getElementById("projectInfo");

  iframe.src = project.videoUrl;

  infoDiv.innerHTML = `
    <div class="flex flex-col gap-4 items-center justify-center">
      <h2 class="font-semibold">${project.title}</h2>
      <p><strong>Tech Stack:</strong> ${project.techStack}</p>
      <p class="text-sm tracking-tight">${project.description}</p>
      <a
        href=${project.sourceCode}
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-row items-center gap-4 hover:scale-110"
      >
        <img
          id="github-icon"
          src="./assets/imgs/githhub.png"
          alt="github Icon"
          class="w-8 h-8"
        />
        <p>View the Source Code</p>
      </a>
    </div>
  `;
}

// Initial render
updateProject(currentProjectIndex);

// Navigation buttons
document.getElementById("prevBtn").addEventListener("click", () => {
  currentProjectIndex =
    (currentProjectIndex - 1 + projects.length) % projects.length;
  updateProject(currentProjectIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  updateProject(currentProjectIndex);
});


const diplomaToggleBtn = document.getElementById('toggleDiplomaBtn');
const diplomaImage = document.getElementById('diplomaImage');

const images = ['./assets/imgs/diploma.jpeg', './assets/imgs/dojo.jpeg'];
let currentIndex = 0;

diplomaToggleBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  diplomaImage.src = images[currentIndex];
});