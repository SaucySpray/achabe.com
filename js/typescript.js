// Variables

const wordsList = ["developer", "designer", "illustrator", "photographer", "painter"]
const changingWord = document.querySelector(".anim")
let count = 0
let index = 0
let word = selectWord()
let toReturn = ""
let untype = false

// Functions

function selectWord() {
    if (count >= wordsList.length - 1) {
        count = 0
        return wordsList[count]
    } else {
        count += 1
        return wordsList[count]
    }
}

function type(fast) {
    setTimeout(() => {
        if (index >= word.length && untype === false) {
            untype = true
            index = word.length
        } else if (untype) {
            if (index <= 0) {
                untype = false
                toReturn = ""
                word = selectWord()
            } else {
                index -= 1
                toReturn = toReturn.slice(0, index)
            }
        } else {
            toReturn += word.charAt(index)
            index += 1
        }

        changingWord.innerText = toReturn
        if (index >= word.length) {
            setTimeout(() => type(untype), 1000)
        } else {
            type(untype)
        }
    }, (fast) ? 80 : 180)
}

type()