const DISPLAY = document.getElementById("words-display")
const COUNTS = document.querySelectorAll("input[name='letter-count']")
// const wordEndpoint = "https://random-randWord-api.herokuapp.com/randWord"
const wordEndpoint = "https://random-word.ryanrk.com/api/en/word/random/"
const wordBank = {
    "4-letter-word" : ["zero","rank","easy","soap","pole","tray","loan","herb","lazy","move","pony","tool","wife","heel","band","safe","boot","tire","firm","file"],
    "5-letter-word" : ["thank","tooth","evoke","creep","water","float","video","drama","fleet","flesh","union","disco","eagle","feast","equal","reign","print","crude","learn","plane"],
    "6-letter-word" : ["marine","revise","depend","remedy","injury","stride","pocket","sermon","foster","porter","agency","favour","export","virtue","leader","rabbit","crutch","patrol","expose","father"],
    "7-letter-word" : ["justify","deposit","density","respect","perfume","privacy","vehicle","program","pasture","trustee","garbage","enhance","feather","express","graphic","version","outline","posture","royalty","terrace"],
    "8-letter-word" : ["activity","facility","occasion","critical","indirect","restless","collapse","increase","threaten","quantity","pleasant","election","tendency","marriage","prestige","dividend","marathon","disaster","restrict","instinct"],
    "9-letter-word" : ["precision","prosecute","treasurer","promotion","execution","hierarchy","leftovers","cigarette","incapable","underline","inspector","broadcast","reservoir","butterfly","sensation","authority","recession","criticism","sculpture","confusion"],
    "10-letter-word" : ["preference","nomination","obligation","gregarious","investment","psychology","continuous","indication","opposition","appreciate","decorative","motivation","instrument","microphone","production","disability","restaurant","definition","memorandum","stereotype"],
    "11-letter-word" : ["information","destruction","achievement","legislation","established","replacement","consumption","fashionable","circulation","demonstrate","expenditure","ghostwriter","experienced","nationalism","instruction","beneficiary","compartment","charismatic","shareholder","coincidence"],
}


let randWord = "never", count;
let curRow = curLetter = 0;
let rows, rowLetters;

function isLetter(key) {
    return key.length == 1 && key.match(/[A-z]/m)
}

async function getWord() {
    /*
    try {
        const response = await fetch(`${wordEndpoint}?length=${count}`)
        const data = await response.json()
        randWord = data[0]
        console.log(await data)
    } catch(error) {
        console.log(error)
    }
    */
   
    let bank = wordBank[`${count}-letter-word`]
    randWord = bank[Math.floor(Math.random() * bank.length)]
    console.log(randWord)
}

function setWordSize() {
    count = document.querySelector("input[name='letter-count']:checked").value
    curRow = curLetter = 0;
    DISPLAY.innerHTML =''
    for(let rows = 0; rows < 6; rows++) {
        const r = document.createElement("div")
        r.classList.add("row")
        for(let l = 0; l < count; l++) {
            const letter = document.createElement("div")
            letter.classList.add("row-letter")
            r.appendChild(letter)
        }
        DISPLAY.appendChild(r)
    }
    getWord()
}

/*
function checkWord() {
    let wordArr = randWord.split("")
    let rowWord = []

    for(let i = 0; i < rowLetters.length; i++) {
        rowWord.push(rowLetters[i].innerText.toLowerCase())
    }

    console.log(rowWord, wordArr)

    for(let c = 0; c < wordArr.length; c++) {
        for(let r = c; r < rowWord.length; r++) {
            if(wordArr[c] === rowWord[r] && c == r) {
                rowLetters[c].classList.add("correct")
            } else if(wordArr[c] === rowWord[r] && c != r) {
                rowLetters[c].classList.add("misplaced")
            }
        }
    }
}
*/

function checkWord() {
    let wordArr = randWord.toLowerCase()
    let rowWord = '', correctLetters = 0;
    
    for(let i = 0; i < rowLetters.length; i++) {
        rowWord += rowLetters[i].innerText.toLowerCase()
    }
    
    for(let r = 0; r < rowWord.length; r++) {
        console.log(rowWord[r], wordArr[r])
        if(rowWord[r] === wordArr[r]) {
            rowLetters[r].classList.add("correct")
            correctLetters++
        } else if(wordArr.includes(rowWord[r])) {
            rowLetters[r].classList.add("misplaced")
        } else {
            rowLetters[r].classList.add("incorrect")
        }
    }
    
    correctLetters == 5 ? console.log("WIN!") : false
}

function keyInput(k) {
    rows = document.querySelectorAll(".row")
    rowLetters = rows[curRow].children
    key = k.key
    
    if(isLetter(key) && curLetter < rowLetters.length) {
        rowLetters[curLetter].innerText = key
        rowLetters[curLetter].classList.add("selected")
        curLetter++
    }
    
    if(key == "Backspace" && curLetter > 0) {
        curLetter--
        rowLetters[curLetter].innerText = ''
        rowLetters[curLetter].classList.remove("selected")
    }

    if(key == "Enter" && curLetter == rowLetters.length) {
        checkWord()
        rows[curRow].classList.add("done")
        curRow++
        curLetter = 0
    }
}

window.addEventListener("keydown", keyInput)
COUNTS.forEach(co => co.addEventListener("click", setWordSize))
setWordSize()