const theme = localStorage.getItem("theme");
if (theme) document.documentElement.dataset.theme = theme;

export const themeSwitchButton = document.getElementById("themeSwitchBtn");
themeSwitchButton.checked = theme === "dark";

export const changeTheme = () => {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", document.documentElement.dataset.theme);
}