let theme = localStorage.getItem("theme");
let themeButton = document.getElementById("theme-button");

theme ? (themeButton.innerText = theme) : (themeButton.innerText = "light");

themeButton.addEventListener("click", () => {
  if (theme === "light") {
    localStorage.setItem("theme", "dark");
    theme = "dark";
    themeButton.innerText = "dark";
  } else {
    localStorage.setItem("theme", "light");
    theme = "light";
    themeButton.innerText = "light";
  }
});
