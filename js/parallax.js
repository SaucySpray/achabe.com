const background = document.querySelector("#landing");
const page = document.querySelector("#master");
let gravity = 1.5;
const pageWidth = window.innerWidth / gravity;
const pageHeight = window.innerHeight / gravity;

page.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / pageWidth;
  const mouseY = e.clientY / pageHeight;

  background.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
});