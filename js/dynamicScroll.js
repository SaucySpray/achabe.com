const scrollAnim = {
  appendMessage: document.querySelector(".messageTransition"),
  appendDiv: document.querySelector(".scrollTransition"),
  btns: document.querySelectorAll(".nav--btn"),
  transitionDivs: [],
  messages : ["Works", "Skills", "Contact"],
}

let btnID = -1;

function showMessage(index) {
  scrollAnim.appendMessage.classList.remove("messageHidden");
  scrollAnim.appendMessage.innerHTML = scrollAnim.messages[index];
  scrollAnim.appendMessage.classList.add("messageVisible");
  setTimeout(() => { scrollAnim.appendMessage.innerHTML = "";
    scrollAnim.appendMessage.classList.add("messageHidden");
    scrollAnim.appendMessage.classList.remove("messageVisible");
  } , 1000)
}

for (let i=0; i<scrollAnim.btns.length; i++) {
  scrollAnim.btns[i].addEventListener("click", () => {
    createDiv().then(() => movingDiv()).catch(e => console.log(e));
    setTimeout(() => {
      showMessage(scrollAnim.btns[i].dataset.page)
    }, 500)
  });
}

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

function movingDiv(){
  for (let i=0; i < scrollAnim.transitionDivs.length; i++) {
    setTimeout(() => {
      scrollAnim.transitionDivs[i].classList.add('animate')
    }, (200 + i * 50))
  }
  removeDiv()
}

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