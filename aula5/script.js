// Geolocation API

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
  const map = document.getElementById("map");
  map.innerHTML = `
    <p>Latitude: ${position.coords.latitude}</p>
    <p>Longitude: ${position.coords.longitude}</p>
  `;
});

// DateTime API

function getDateTime() {
  const dateTime = new Date();
  const date = dateTime.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const dateElement = document.getElementById("date");
  dateElement.innerHTML = date;

  const clock = dateTime.toLocaleString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const clockElement = document.getElementById("clock");
  clockElement.innerHTML = clock;
}

setInterval(() => {
  getDateTime();
}, 1000);

// Clipboard API

const copyText = document.getElementById("copy-text");
const copyButton = document.getElementById("copy-button");

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(copyText.value);
  alert("Texto copiado para a área de transferência");
});

// Fullscreen API

const fullscreenButton = document.getElementById("fullscreen-button");

let isFullscreen = false;

fullscreenButton.addEventListener("click", () => {
  const documentElement = document.documentElement;
  if (documentElement.requestFullscreen && !isFullscreen) {
    documentElement.requestFullscreen();
    isFullscreen = true;
  } else if (document.exitFullscreen && isFullscreen) {
    document.exitFullscreen();
    isFullscreen = false;
  } else {
    alert("Fullscreen not supported");
  }
});
