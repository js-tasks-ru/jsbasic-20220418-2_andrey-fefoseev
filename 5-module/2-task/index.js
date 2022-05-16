function toggleText() {
  const toggleButton = document.querySelector(".toggle-text-button");
  const hiddenText = document.getElementById("text");
  toggleButton.addEventListener('click', () => hiddenText.hidden = !hiddenText.hidden);
}

