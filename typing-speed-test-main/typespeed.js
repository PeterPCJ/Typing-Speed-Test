let c = (item) => {
    return document.querySelector(item);
}

let typeArea = c('.type-area');
let modal = c('.modal');
let wpm = c('.num');
let accuracy = c('.num.accuracy');
let time = c('.num.time');
let personal = c('.personal');
let Basetext = c('.text');
let changeDifficulty = false;
let typezone = c('#typezone');
let sec = 0;
let stopwatch;
let randomNum = 0;
let orignalText = '';
let difficulty = document.querySelectorAll('.easy, .medium, .hard'); 
let mode = document.querySelectorAll('.timed, .passage');
let select = c('.type .config');
let timed = false
let difficultySelected = false;
let modeSelected = false;
let selection = document.getElementById('mode');
let selectionTime = document.getElementById('time');
let pointsNum = c('.points-num');
let correctChr = 0
let bestP = 0
let typed;
let spanCortQt;

/* Functions */
function updateTitle() {
    if(document.querySelector('body').clientWidth <= 425) {
        personal.innerHTML = 'Best:';
    } else {
        personal.innerHTML = `Personal best:`;
    }
};

updateTitle();
window.addEventListener('resize', updateTitle);

mode.forEach((chose) => {
    chose.addEventListener('click', (e) => {
        mode.forEach((chose) => {
            if(chose.classList.contains('active')) {
                chose.classList.remove('active')
            }

        })

        if(changeDifficulty) {
            if(!stopwatch) {
                e.target.classList.add('active');
                modeSelected = true;
            }
            if(e.target.classList.contains('timed') && e.target.classList.contains('active')) {
                timed = true;
            } else if(e.target.classList.contains('passage') && e.target.classList.contains('active')) {
                console.log('Você escolheu o modo com tempo ilimitado!')
            }
        }
        
    });
});

function start() {
    changeDifficulty = true;
    typeArea.style.display = 'none';
    modal.style.display = 'none';
    select.style.display = 'block'
    wpm.innerHTML = '0';
    time.innerHTML = '0'
    accuracy.innerHTML = '0%'
    pointsNum.innerHTML = '0 WPM'
    selection.disabled = false;
    selectionTime.disabled = false;
}

function stopTime() {
    sec = 0;
    clearInterval(stopwatch);
    stopwatch = null;
    time.innerHTML = '0:00';
}




difficulty.forEach((item) => {
    item.addEventListener('click', () => {
        stopTime();
        timed = false;
        Basetext.innerText = ''
        typezone.innerHTML = ''
        typezone.value = '';
        wpm.innerHTML = '0';
        let chrSpan = '';
        accuracy.innerHTML = '0%';
        typezone.readOnly = false;
        difficultySelected = true;

        mode.forEach((tMode) =>{
            tMode.classList.remove('active')
        })
        

        difficulty.forEach((selected) => {
            selected.classList.remove('active')
        })

        randomNum = Math.floor(Math.random() * 10);
        
        if(changeDifficulty) {
            typezone.style.display = 'block'
            item.classList.add('active');
            select.style.display = 'none'
            if(item.classList.contains('easy') && item.classList.contains('active')) {
                text.easy[randomNum].text.split('').forEach(chr => {
                    chrSpan = document.createElement('span');
                    chrSpan.innerText = chr;
                    
                    orignalText = Basetext.appendChild(chrSpan);
                });
            } else if(item.classList.contains('medium') && item.classList.contains('active')) {
                text.medium[randomNum].text.split('').forEach(chr => {
                    chrSpan = document.createElement('span');
                    chrSpan.innerText = chr;
                    orignalText = Basetext.appendChild(chrSpan);
                });
            } else {
                text.hard[randomNum].text.split('').forEach(chr => {
                    chrSpan = document.createElement('span');
                    chrSpan.innerText = chr;
                    orignalText = Basetext.appendChild(chrSpan);
                });
            }
        }
        
        
    })

});

typezone.addEventListener('input', ()=> {
    
    if(!stopwatch) {
        stopwatch = setInterval(() => {
            sec++
            let min = Math.floor(sec / 60);
            let seconds = sec % 60;
            if(seconds < 10) {
                seconds = `0${seconds}`;
            }
            time.innerHTML = `${min}:${seconds}`;

            if(timed && sec > 59) {
                console.log('Você passou do LIMITE!')
                timeMode()

            }
        }, 1000);
        selectionTime.disabled = true;
    }
    
    typed = typezone.value.split('')
    let correct = true

    

    Basetext.querySelectorAll('span').forEach((span, index) => {
        let letter = typed[index]
        if(letter == null) {
            span.classList.remove('correct')
            span.classList.remove('incorrect')
            correct = false;
        } else if(letter === span.innerText) {
            span.classList.add('correct');
            span.classList.remove('incorrect');
        } else {
            span.classList.remove('correct');
            span.classList.add('incorrect');
            correct = false;
        }

    });

    let allSpan = Array.from(Basetext.querySelectorAll('span'))
    let spanCorrect = allSpan.filter((correct)=>{
        return correct.classList.contains('correct')
    })

    spanCortQt = spanCorrect.length

    if(correct && typed.length >= Basetext.querySelectorAll('span').length) {
        clearInterval(stopwatch);
        wpmMesure(typed.length, sec)
        congrats()
        typezone.readOnly = true;
    }
    
    

});

function congrats () {
    clearInterval(stopwatch);
    let msg = document.createElement('div')
    msg.innerText = 'Congrats, you finished the test!'
    Basetext.appendChild(msg)
    selectionTime.disabled = false;
    accur(spanCortQt, typed.length)
}

function wpmMesure(chrNum, time) {
    console.log(time)
    console.log(chrNum)
    let wpmNum = Math.round((chrNum / 5) / (time / 60))
    wpm.innerHTML = `${wpmNum}`
    Bestpoint(wpmNum)
}

function timeMode() {
    clearInterval(stopwatch);
    typezone.readOnly = true;
    selectionTime.disabled = false;
    wpmMesure(typed.length, sec)
    accur(spanCortQt, typed.length)
}

function accur(sCor, typedQt) {
    let accurNum = Math.round((sCor / typedQt) * 100)
    accuracy.innerHTML = `${accurNum}%`
}

function Bestpoint(point) {
    if(point > bestP) {
        bestP = point
        pointsNum.innerHTML = bestP+' WPM'
    }
}





selection.addEventListener('change', ()=> {
    stopTime();
    Basetext.innerText = '';
    typezone.innerHTML = ''
    typezone.value = '';
    wpm.innerHTML = '0';
    let chrSpan = '';
    accuracy.innerHTML = '0%';
    typezone.readOnly = false;
    difficultySelected = true;
    select.style.display = 'none'
    selectionTime.disabled = false;


    let valorD = selection.value;
    randomNum = Math.floor(Math.random() * 10);
    typezone.style.display = 'block'
    console.log(valorD);

    switch(valorD) {
        case 'easy':
            text.easy[randomNum].text.split('').forEach(chr => {
                chrSpan = document.createElement('span');
                chrSpan.innerText = chr;
                
                orignalText = Basetext.appendChild(chrSpan);
            });
            break
            case 'medium':
                text.medium[randomNum].text.split('').forEach(chr => {
                    chrSpan = document.createElement('span');
                    chrSpan.innerText = chr;
                    orignalText = Basetext.appendChild(chrSpan);
                });
                break
                case 'hard': 
                text.hard[randomNum].text.split('').forEach(chr => {
                    chrSpan = document.createElement('span');
                    chrSpan.innerText = chr;
                    orignalText = Basetext.appendChild(chrSpan);
                });
                break
    }
});

selectionTime.addEventListener('change', () => {
    modeSelected = true;
    let valueT = selectionTime.value;
    
    switch (valueT) {
        case 'timed':
            timed = true;
            break
            case 'passage':
                timed = false;
    }
})












