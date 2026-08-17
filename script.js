/*==========================================================
                DOM ELEMENTS
==========================================================*/

const introOverlay = document.getElementById("introOverlay");

const scenes = [...document.querySelectorAll(".scene")];

const nextButtons = [...document.querySelectorAll(".next-btn")];

/*==========================================================
                POLAROIDS
==========================================================*/

const polaroidStack =
    document.getElementById("polaroidStack");

const nextPolaroid =
    document.getElementById("nextPolaroid");


const blowCandles =
    document.getElementById("blowCandles");

const flames =
    [...document.querySelectorAll(".flame")];

const addressForm =
    document.getElementById("addressForm");

/*==========================================================
                STATE
==========================================================*/

let currentScene = 0;

let candlesBlown = false;




/*==========================================================
                INTRO
==========================================================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        introOverlay.classList.add("hide");

    },3200);

});


/*==========================================================
                BACKGROUND MUSIC
==========================================================*/

const soundToggle = document.getElementById("soundToggle");
const birthdayMusic = document.getElementById("birthdayMusic");

let musicPlaying = false;
let musicStarted = false;


/*==========================================================
            START MUSIC AFTER FIRST INTERACTION
==========================================================*/

async function startMusic() {

    if (musicStarted) return;

    try {

        await birthdayMusic.play();

        musicPlaying = true;
        musicStarted = true;

        soundToggle.textContent = "🔊";
        soundToggle.classList.add("playing");

        console.log("🎵 Birthday music started");

    } catch (error) {

        console.error("Music failed to play:", error);

    }

}


/*==========================================================
            SOUND BUTTON
==========================================================*/

soundToggle.addEventListener("click", async (event) => {

    event.stopPropagation();

    if (musicPlaying) {

        birthdayMusic.pause();

        musicPlaying = false;

        soundToggle.textContent = "🔇";
        soundToggle.classList.remove("playing");

    } else {

        try {

            await birthdayMusic.play();

            musicPlaying = true;
            musicStarted = true;

            soundToggle.textContent = "🔊";
            soundToggle.classList.add("playing");

        } catch (error) {

            console.error("Music failed to play:", error);

        }

    }

});

/*==========================================================
            START MUSIC ON FIRST USER INTERACTION
==========================================================*/

document.addEventListener("click", () => {

    if (!musicStarted) {
        startMusic();
    }

}, { once: true });

/*==========================================================
                SCENE CHANGE
==========================================================*/

function showScene(index){

    if(index<0)return;

    if(index>=scenes.length)return;

    scenes[currentScene].classList.remove("active");

    scenes[currentScene].classList.add("exit");

    setTimeout(()=>{

        scenes[currentScene].classList.remove("exit");

    },450);

    currentScene=index;

    scenes[currentScene].classList.add("active");

    scenes[currentScene].classList.add("enter");

    setTimeout(()=>{

        scenes[currentScene].classList.remove("enter");

    },700);

}

/*==========================================================
                NEXT BUTTONS
==========================================================*/

nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const nextID=

        button.dataset.next;

        const nextScene=

        scenes.findIndex(scene=>

            scene.id===nextID

        );

        showScene(nextScene);

    });

});

/*==========================================================
                POLAROID MEMORIES
==========================================================*/

const memories = [

{
    image:"assets/images/polaroids/ocean.webp",
    caption:"Like the ocean, you have so much depth to you. There is always another thought, another idea, another little part of you waiting to be discovered."
},

{
    image:"assets/images/polaroids/sunrise.webp",
    caption:"Just like a beautiful sunrise, you bring a sense of excitement to new beginnings. There is something wonderfully hopeful about the way you look toward whatever comes next."
},

{
    image:"assets/images/polaroids/flowers.webp",
    caption:"Like a garden full of flowers, you have so many different sides to you. Sweet one moment, playful the next, wonderfully chaotic sometimes, and somehow every version still feels completely you."
},

{
    image:"assets/images/polaroids/stars.webp",
    caption:"Just like the stars, you have your own little universe. Your thoughts, your dreams, your interests, your quirks — all those little pieces come together to make you wonderfully unique."
},

{
    image:"assets/images/polaroids/rain.webp",
    caption:"Like rain falling on a quiet afternoon, you have a way of making moments feel unhurried. There is something lovely about the way your mind wanders, notices little things, and finds meaning in them."
},

{
    image:"assets/images/polaroids/mountains.webp",
    caption:"Like the mountains, you carry a strength that doesn't need to announce itself. You keep going, keep growing, and keep finding your way through things that once seemed impossible."
},
{
    image:"assets/images/polaroids/coffee.webp",
    caption:"Like a warm cup of coffee on a sleepy morning, you have a wonderfully comforting side. Your little routines and small habits make even simple moments feel special."
},

{
    image:"assets/images/polaroids/books.webp",
    caption:"Like a really good book, there is always another chapter of you worth discovering. Your stories, thoughts, opinions and wonderfully random details make you endlessly interesting."
},

{
    image:"assets/images/polaroids/forest.webp",
    caption:"Like a forest full of hidden paths, you have an adventurous side that keeps things interesting. Your curiosity, spontaneity and little spark make every corner worth exploring."
},

{
    image:"assets/images/polaroids/moon.webp",
    caption:"Like the moon turning an ordinary night into something worth stopping for, you make even the simplest moments feel memorable. Somehow even your ordinary days always have something special about them."
}
];

let currentMemory = 0;

/*==========================================================
                POLAROID ENGINE
==========================================================*/

function renderPolaroids(){

    polaroidStack.innerHTML = "";

    const visibleCards = 4;

    for(let i = 0; i < visibleCards; i++){

        const index = currentMemory + i;

        if(index >= memories.length) break;

        const memory = memories[index];

        const card = document.createElement("div");

        card.className = "polaroid";

        card.innerHTML = `

            <div class="polaroid-image">

                <img
                    src="${memory.image}"
                    alt="Memory">

            </div>

            <div class="polaroid-caption">

                ${memory.caption}

            </div>

        `;

        polaroidStack.appendChild(card);

    }

}

renderPolaroids();

/*==========================================================
            NEXT POLAROID
==========================================================*/

nextPolaroid.addEventListener("click", () => {

    const topCard = document.querySelector(".polaroid");

    if(topCard){

        topCard.classList.add("exit");

    }

    setTimeout(() => {

        currentMemory++;

        if(currentMemory >= memories.length){

            const cakeScene = scenes.findIndex(

                scene => scene.id === "beforeLetter"

            );

            showScene(cakeScene);

            return;

        }

        renderPolaroids();

    },700);

});

/*==========================================================
                CAKE
==========================================================*/

const blowBtn = document.getElementById("blowCandles");
const partyGif = document.getElementById("partyGif");

blowCandles.addEventListener("click", () => {

    /* First press: blow out candles */
    if (!candlesBlown) {

        candlesBlown = true;

        flames.forEach(flame => {
            flame.classList.add("out");
        });

        blowCandles.textContent =
            "🎉 Happy Birthday!";

        partyGif.style.display = "block";

        requestAnimationFrame(() => {
            partyGif.classList.add("show");
        });

    }

    /* Every press: celebrate again */
    launchConfetti();

});



/*==========================================================
                ADDRESS CONFIRMATION
==========================================================*/

const sameAddressBtn =
    document.getElementById("sameAddressBtn");

const movedAddressBtn =
    document.getElementById("movedAddressBtn");

const sameAddressResponse =
    document.getElementById("sameAddressResponse");

const newAddressForm =
    document.getElementById("newAddressForm");

const confirmSameAddress =
    document.getElementById("confirmSameAddress");

// const addressForm =
//     document.getElementById("addressForm");


/* Same address */

sameAddressBtn.addEventListener("click", () => {

    sameAddressResponse.classList.add("show");
    newAddressForm.classList.remove("show");

    sameAddressBtn.style.display = "none";
    movedAddressBtn.style.display = "none";

});


/* Moved */

movedAddressBtn.addEventListener("click", () => {

    newAddressForm.classList.add("show");
    sameAddressResponse.classList.remove("show");

    sameAddressBtn.style.display = "none";
    movedAddressBtn.style.display = "none";

});


/* Confirm existing address */

confirmSameAddress.addEventListener("click", () => {

    showThankYou();

});


/* Submit new address */

addressForm.addEventListener("submit", event => {

    event.preventDefault();

    saveAddress();

});


/*==========================================================
                SAVE ADDRESS
==========================================================*/

let formSubmitted = false;

const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbzrwhC2XJJKXDbCdfBBLefl1o9KpCHKaSLsr9pOBFRuR6saN9FwPgWGeKWkXtwPXp5N/exec";


function saveAddress(){

    if(formSubmitted) return;

    const addressField =
        document.getElementById("addressField");

    const data = {

        address:
            addressField.value.trim()

    };


    if(!data.address){

        alert("Please enter your address.");

        return;

    }


    formSubmitted = true;


    console.log(data);


    fetch(GOOGLE_SHEET_URL, {

        method:"POST",

        mode:"no-cors",

        headers:{
            "Content-Type":
                "text/plain;charset=utf-8"
        },

        body:JSON.stringify(data)

    })
    .then(()=>{

        console.log(
            "Address submitted successfully."
        );

        setTimeout(
            showThankYou,
            800
        );

    })
    .catch(error=>{

        console.error(
            "Address submission failed:",
            error
        );

        formSubmitted = false;

    });

}

/*==========================================================
                THANK YOU
==========================================================*/

function showThankYou(){

const goodbyeScene=

scenes.findIndex(

scene=>scene.id==="goodbye"

);

showScene(goodbyeScene);

}

/*==========================================================
                BACKGROUND DECORATIONS
==========================================================*/

const floatingDecor=

document.getElementById("floatingDecor");

const icons=[

"✨",

"🌸",

"💖",

"⭐",

"🦋"

];

function createDecoration(){

const span=document.createElement("span");

const icon=

icons[

Math.floor(

Math.random()*icons.length

)

];

span.textContent=icon;

span.className="decor";

span.style.left=

Math.random()*100+"%";

span.style.animationDuration=

10+

Math.random()*12+

"s";

span.style.fontSize=

16+

Math.random()*18+

"px";

floatingDecor.appendChild(span);

setTimeout(()=>{

span.remove();

},22000);

}

setInterval(

createDecoration,

1200

);

/*==========================================================
                TYPEWRITER LETTER
==========================================================*/

const letterSection = document.getElementById("letter");
const letterBody = document.getElementById("letterBody");

const originalLetter = letterBody.textContent.trim();

let letterPlayed = false;

function typeLetter() {

    if (letterPlayed) return;

    letterPlayed = true;

    letterBody.textContent = "";

    let index = 0;

    function type() {

        if (index >= originalLetter.length) return;

        letterBody.textContent += originalLetter[index];

        index++;

        setTimeout(type, 28);

    }

    type();

}


/*==========================================================
                CATCH ME IF YOU CAN
==========================================================*/

const catchHeart =
    document.getElementById("catchHeart");

const heartArena =
    document.getElementById("heartArena");

const catchScore =
    document.getElementById("catchScore");

const catchCombo =
    document.getElementById("catchCombo");

const catchTimer =
    document.getElementById("catchTimer");

const catchProgressBar =
    document.getElementById("catchProgressBar");

const catchGameWrapper =
    document.getElementById("catchGameWrapper");

const catchSuccess =
    document.getElementById("catchSuccess");

const catchGameOver =
    document.getElementById("catchGameOver");

const retryCatchGame =
    document.getElementById("retryCatchGame");

const life1 =
    document.getElementById("life1");

const life2 =
    document.getElementById("life2");

const life3 =
    document.getElementById("life3");


/*==========================================================
                GAME SETTINGS
==========================================================*/

const targetScore = 20;

const gameDuration = 30;

let score = 0;

let combo = 0;

let lives = 3;

let timeLeft = gameDuration;

let gameRunning = false;

let gameTimer = null;

let moveTimer = null;


/*==========================================================
                GAME DIFFICULTY
==========================================================*/

function getDifficulty(){

    if(score < 5){

        return {
            moveSpeed:900,
            size:2.6
        };

    }

    if(score < 10){

        return {
            moveSpeed:700,
            size:2.4
        };

    }

    if(score < 15){

        return {
            moveSpeed:520,
            size:2.2
        };

    }

    return {

        moveSpeed:360,

        size:2

    };

}


/*==========================================================
                RANDOM POSITION
==========================================================*/

function getRandomPosition(){

    const padding = 45;

    const width =
        heartArena.clientWidth;

    const height =
        heartArena.clientHeight;


    const x =
        padding +
        Math.random() *
        (width - padding * 2);


    const y =
        padding +
        Math.random() *
        (height - padding * 2);


    return {
        x,
        y
    };

}


/*==========================================================
                MOVE TARGET
==========================================================*/

function moveTarget(){

    if(!gameRunning)return;


    const position =
        getRandomPosition();


    catchHeart.style.left =
        position.x + "px";


    catchHeart.style.top =
        position.y + "px";


    const difficulty =
        getDifficulty();


    catchHeart.style.fontSize =
        difficulty.size + "rem";


    /* Random target type */

    const random =
        Math.random();


    catchHeart.classList.remove(
        "bonus",
        "bad"
    );


    if(
        score >= 5 &&
        random < .16
    ){

        catchHeart.textContent =
            "💔";

        catchHeart.classList.add(
            "bad"
        );

    }

    else if(
        score >= 8 &&
        random < .28
    ){

        catchHeart.textContent =
            "💖";

        catchHeart.classList.add(
            "bonus"
        );

    }

    else{

        catchHeart.textContent =
            "💗";

    }


    clearTimeout(moveTimer);


    moveTimer = setTimeout(

        moveTarget,

        difficulty.moveSpeed

    );

}


/*==========================================================
                PARTICLES
==========================================================*/

function createCatchParticles(
    x,
    y,
    bad=false
){

    const particles = bad

        ? ["💥","💔","✨"]

        : ["💗","💕","✨","💖"];


    for(
        let i=0;
        i<6;
        i++
    ){

        const particle =
            document.createElement("span");


        particle.className =
            "catch-particle";


        particle.textContent =

            particles[
                Math.floor(
                    Math.random() *
                    particles.length
                )
            ];


        particle.style.left =
            x + "px";


        particle.style.top =
            y + "px";


        particle.style.setProperty(

            "--particle-x",

            (
                (Math.random()-.5) *
                100
            ) + "px"

        );


        particle.style.setProperty(

            "--particle-y",

            (
                (Math.random()-.5) *
                100
            ) + "px"

        );


        heartArena.appendChild(
            particle
        );


        setTimeout(()=>{

            particle.remove();

        },700);

    }

}


/*==========================================================
                SCORE POPUP
==========================================================*/

function createScorePopup(
    x,
    y,
    text
){

    const popup =
        document.createElement("span");


    popup.className =
        "score-popup";


    popup.textContent =
        text;


    popup.style.left =
        x + "px";


    popup.style.top =
        y + "px";


    heartArena.appendChild(
        popup
    );


    setTimeout(()=>{

        popup.remove();

    },700);

}


/*==========================================================
                UPDATE LIVES
==========================================================*/

function updateLives(){

    life1.textContent =
        lives >= 1 ? "❤️" : "🖤";

    life2.textContent =
        lives >= 2 ? "❤️" : "🖤";

    life3.textContent =
        lives >= 3 ? "❤️" : "🖤";

}


/*==========================================================
                CATCH TARGET
==========================================================*/

catchHeart.addEventListener(
    "click",
    event => {

        if(!gameRunning)return;


        const rect =
            catchHeart.getBoundingClientRect();


        const arenaRect =
            heartArena.getBoundingClientRect();


        const x =
            rect.left -
            arenaRect.left +
            rect.width / 2;


        const y =
            rect.top -
            arenaRect.top +
            rect.height / 2;


        const isBad =
            catchHeart.classList.contains(
                "bad"
            );


        const isBonus =
            catchHeart.classList.contains(
                "bonus"
            );


        /*==================================================
                    BROKEN HEART
        ==================================================*/

        if(isBad){

            lives--;

            combo = 0;


            createCatchParticles(
                x,
                y,
                true
            );


            createScorePopup(
                x,
                y,
                "-1 ❤️"
            );


            updateLives();


            catchHeart.classList.add(
                "caught"
            );


            if(lives <= 0){

                setTimeout(
                    endGame,
                    400
                );

                return;

            }


            setTimeout(()=>{

                catchHeart.classList.remove(
                    "caught"
                );

                moveTarget();

            },250);


            return;

        }


        /*==================================================
                    GOOD HEART
        ==================================================*/

        combo++;


        let points = 1;


        /* Golden heart */

        if(isBonus){

            points = 3;

        }


        /* Combo bonus */

        if(combo >= 5){

            points++;

        }


        score += points;


        if(score > targetScore){

            score = targetScore;

        }


        catchScore.textContent =
            score;


        catchCombo.textContent =
            "x" + Math.min(combo,5);


        catchProgressBar.style.width =
            (
                score /
                targetScore *
                100
            ) + "%";


        createCatchParticles(
            x,
            y
        );


        createScorePopup(
            x,
            y,
            "+" + points
        );


        catchHeart.classList.add(
            "caught"
        );


        /*==================================================
                    WIN
        ==================================================*/

        if(score >= targetScore){

            setTimeout(
                winGame,
                400
            );

            return;

        }


        /*==================================================
                    NEXT TARGET
        ==================================================*/

        setTimeout(()=>{

            catchHeart.classList.remove(
                "caught"
            );

            moveTarget();

        },180);

    }
);


/*==========================================================
                TIMER
==========================================================*/

function updateTimer(){

    if(!gameRunning)return;


    timeLeft--;


    catchTimer.textContent =
        timeLeft;


    if(timeLeft <= 0){

        endGame();

    }

}


/*==========================================================
                START GAME
==========================================================*/

function startCatchGame(){

    clearInterval(gameTimer);

    clearTimeout(moveTimer);


    score = 0;

    combo = 0;

    lives = 3;

    timeLeft =
        gameDuration;


    gameRunning = true;


    catchScore.textContent =
        "0";


    catchCombo.textContent =
        "x1";


    catchTimer.textContent =
        gameDuration;


    catchProgressBar.style.width =
        "0%";


    updateLives();


    catchGameWrapper.style.display =
        "block";


    catchSuccess.classList.remove(
        "show"
    );


    catchGameOver.classList.remove(
        "show"
    );


    catchHeart.style.display =
        "flex";


    catchHeart.classList.remove(
        "caught"
    );


    moveTarget();


    gameTimer = setInterval(

        updateTimer,

        1000

    );

}


/*==========================================================
                WIN GAME
==========================================================*/

function winGame(){

    if(!gameRunning)return;


    gameRunning = false;


    clearInterval(gameTimer);

    clearTimeout(moveTimer);


    /*
        The game disappears completely.
        The winning message takes its place.
    */

    catchGameWrapper.style.display =
        "none";


    catchGameOver.classList.remove(
        "show"
    );


    catchSuccess.classList.add(
        "show"
    );

}


/*==========================================================
                GAME OVER
==========================================================*/

function endGame(){

    if(!gameRunning)return;


    gameRunning = false;


    clearInterval(gameTimer);

    clearTimeout(moveTimer);


    catchGameWrapper.style.display =
        "none";


    catchSuccess.classList.remove(
        "show"
    );


    catchGameOver.classList.add(
        "show"
    );

}


/*==========================================================
                RETRY
==========================================================*/

retryCatchGame.addEventListener(
    "click",
    () => {

        startCatchGame();

    }
);


/*==========================================================
                RESET WHEN ENTERING SCENE
==========================================================*/

function resetCatchGame(){

    clearInterval(gameTimer);

    clearTimeout(moveTimer);


    gameRunning = false;


    catchGameWrapper.style.display =
        "block";


    catchSuccess.classList.remove(
        "show"
    );


    catchGameOver.classList.remove(
        "show"
    );


    catchHeart.classList.remove(
        "caught"
    );


    catchHeart.style.display =
        "flex";


    startCatchGame();

}

/*==========================================================
                SCENE OBSERVER
==========================================================*/

function handleSceneEvents(sceneId){

    switch(sceneId){

        case "polaroids":

            renderPolaroids();

            break;

        case "letter":

            typeLetter();

            break;

        case "catchGame":

            resetCatchGame();

            break;

    }

}

/*==========================================================
        PATCH SCENE CHANGE FUNCTION
==========================================================*/

const originalShowScene = showScene;

showScene = function(index){

    originalShowScene(index);

    handleSceneEvents(scenes[index].id);

};

/*==========================================================
                BUTTON RIPPLE
==========================================================*/

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",event=>{

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=button.getBoundingClientRect();

        ripple.style.left=(event.clientX-rect.left)+"px";

        ripple.style.top=(event.clientY-rect.top)+"px";

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/*==========================================================
            SIMPLE CONFETTI
==========================================================*/

const confettiCanvas=document.getElementById("confettiCanvas");

const ctx=confettiCanvas.getContext("2d");

function resizeCanvas(){

    confettiCanvas.width=window.innerWidth;

    confettiCanvas.height=window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

let confetti=[];

function randomColor(){

    const colors=[

        "#FFD6E8",

        "#DCCCFB",

        "#D8F7E8",

        "#DDEEFF",

        "#FFEAA7"

    ];

    return colors[Math.floor(Math.random()*colors.length)];

}

function launchConfetti(){

    confetti=[];

    for(let i=0;i<250;i++){

        confetti.push({

            x:Math.random()*window.innerWidth,

            y:-20-Math.random()*window.innerHeight,

            r:4+Math.random()*6,

            color:randomColor(),

            dx:(Math.random()-.5)*3,

            dy:2+Math.random()*4,

            gravity:.08,

            rotation:Math.random()*360,

            rotationSpeed:(Math.random()-.5)*8

        });

    }

    animateConfetti();

}

function animateConfetti(){

    ctx.clearRect(

        0,

        0,

        confettiCanvas.width,

        confettiCanvas.height

    );

    confetti.forEach(piece=>{

        piece.x+=piece.dx;

        piece.y+=piece.dy;

        piece.dy+=piece.gravity;

        piece.rotation+=piece.rotationSpeed;

        ctx.save();

        ctx.translate(piece.x,piece.y);

        ctx.rotate(piece.rotation*Math.PI/180);

        ctx.fillStyle=piece.color;

        ctx.fillRect(

            -piece.r/2,

            -piece.r/2,

            piece.r,

            piece.r

        );

        ctx.restore();

    });

    confetti=confetti.filter(

        p=>p.y<window.innerHeight+50

    );

    if(confetti.length){

        requestAnimationFrame(animateConfetti);

    }

}

/*==========================================================
            CANDLE SMOKE
==========================================================*/

function createSmoke(x,y){

    const smoke=document.createElement("div");

    smoke.className="smoke";

    smoke.style.left=x+"px";

    smoke.style.top=y+"px";

    document.body.appendChild(smoke);

    setTimeout(()=>{

        smoke.remove();

    },2200);

}

blowCandles.addEventListener("click",()=>{

    flames.forEach(flame=>{

        const rect=flame.getBoundingClientRect();

        createSmoke(

            rect.left+rect.width/2,

            rect.top

        );

    });

});

/*==========================================================
            KEYBOARD SUPPORT
==========================================================*/

document.addEventListener("keydown",event=>{

    if(event.key==="Enter"){

        const activeButton=

        scenes[currentScene]

        .querySelector(".next-btn");

        if(activeButton){

            activeButton.click();

        }

    }

});

