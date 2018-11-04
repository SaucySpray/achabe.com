// Variables

const scrollAnim = {
  appendMessage: document.querySelector(".messageTransition"),
  appendDiv: document.querySelector(".scrollTransition"),
  btns: document.querySelectorAll(".nav--btn"),
  transitionDivs: [],
  messages : ["Home", "Works", "Skills", "Contact"],
}

const html = document.querySelector('html')
let btnID = -1;

// Show message

function showMessage(index) {
  scrollAnim.appendMessage.classList.toggle("messageHidden");
  scrollAnim.appendMessage.innerHTML = scrollAnim.messages[index];
  setTimeout(() => { scrollAnim.appendMessage.innerHTML = "";
    scrollAnim.appendMessage.classList.toggle("messageHidden");
  } , 1000)
}

// Events on click menu elements

for (let i=0; i<scrollAnim.btns.length; i++) {
  scrollAnim.btns[i].addEventListener("click", () => {
    createDiv().then(() => movingDiv()).catch(e => console.log(e));
    setTimeout(() => {
      showMessage(scrollAnim.btns[i].dataset.page)
    }, 500)
  });
  scrollAnim.btns[i].addEventListener('click', () => {
    setTimeout(() => {
      html.scrollTop = window.innerHeight * i
    }, 400)
  })
}

// Create divs

function createDiv(){
  return new Promise((resolve, reject) => {
    if (scrollAnim.transitionDivs.length <= 0) {
      for (let i=0; i < 3; i++) {
        scrollAnim.transitionDivs[i] = document.createElement("div");
        scrollAnim.transitionDivs[i].classList.add(`scroll`,`scroll_${i}`);
        scrollAnim.transitionDivs[i].dataset.index = i;
        scrollAnim.appendDiv.appendChild(scrollAnim.transitionDivs[i]);
      }
      resolve()
    } else {
      reject()
    }
  })
}

// Move created divs

function movingDiv(){
  for (let i=0; i < scrollAnim.transitionDivs.length; i++) {
    setTimeout(() => {
      scrollAnim.transitionDivs[i].classList.add('animate')
    }, (200 + i * 50))
  }
  removeDiv()
}

// Delete divs after animation

function removeDiv(){
  setTimeout(() => {
    scrollAnim.transitionDivs.sort((a, b) => {
      return b.dataset.index - a.dataset.index
    }).map((el, i) => {
      setTimeout(() => {
        el.classList.add('animate-off')
      }, (1000 + i * 50))
    })
    setTimeout(() => {
      scrollAnim.transitionDivs = []
      scrollAnim.appendDiv.innerHTML = ''
    }, 1500)
  }, 300)
}

// ClipBoard

const clipboard = new ClipboardJS('.copyclip');
const copyclip = document.querySelector('.copyclip')

clipboard.on('success', (e) => {
  copyclip.classList.remove('copy-error')
  copyclip.classList.add('copy-success')
  e.clearSelection();
});

clipboard.on('error', (e) => {
  copyclip.classList.remove('copy-success')
  copyclip.classList.add('copy-error')
  console.error('Action:', e.action);
  console.error('Trigger:', e.trigger);
});