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
    image:"assets/images/polaroids/ocean.jpg",
    caption:"Your eyes are as deep as the ocean—calm enough to bring peace, yet mysterious enough to keep me lost in them forever."
},

{
    image:"assets/images/polaroids/sunrise.jpg",
    caption:"Just like every sunrise, you somehow make ordinary days feel full of hope."
},

{
    image:"assets/images/polaroids/flowers.jpg",
    caption:"Some flowers bloom only once a year. Somehow, you bloom every single day."
},

{
    image:"assets/images/polaroids/stars.jpg",
    caption:"If kindness had a constellation, it would look exactly like you."
},

{
    image:"assets/images/polaroids/rain.jpg",
    caption:"Even rainy days feel beautiful when I imagine sharing them with you."
},

{
    image:"assets/images/polaroids/mountains.jpg",
    caption:"Quiet strength has a face, and somehow it reminds me of you."
},

{
    image:"assets/images/polaroids/coffee.jpg",
    caption:"You somehow make comfort feel effortless."
},

{
    image:"assets/images/polaroids/books.jpg",
    caption:"Every page tells a story. Meeting you became one of my favourite chapters."
},

{
    image:"assets/images/polaroids/forest.jpg",
    caption:"You bring the same kind of peace that only nature knows how to give."
},

{
    image:"assets/images/polaroids/moon.jpg",
    caption:"Some things never stop being beautiful. The moon... and you."
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

            <div class="polaroid-sign">

                ~ ❤️

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

blowCandles.addEventListener(

"click",

()=>{

if(candlesBlown)return;

candlesBlown=true;

flames.forEach(flame=>{

flame.classList.add("out");

});

blowCandles.textContent=

"🎉 Yay! Happy Birthday!";

launchConfetti();

partyGif.style.display = "block";

    requestAnimationFrame(() => {
        partyGif.classList.add("show");
    });


}

);

/*==========================================================
                CONFETTI PLACEHOLDER
==========================================================*/

function launchConfetti(){

console.log("Confetti");

}
/*==========================================================
                ADDRESS FORM
==========================================================*/

addressForm.addEventListener(

"submit",

event=>{

event.preventDefault();

saveAddress();

}

);

/*==========================================================
                SAVE
==========================================================*/

function saveAddress(){

const data={

name:

document.getElementById("name").value.trim(),

address:

document.getElementById("addressField").value.trim(),

city:

document.getElementById("city").value.trim(),

pincode:

document.getElementById("pincode").value.trim()

};

console.log(data);

/*
Firebase comes later.
*/

showThankYou();

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

/*==========================================================
            PREVENT DOUBLE SUBMIT
==========================================================*/

let formSubmitted=false;

function saveAddress(){

    if(formSubmitted) return;

    formSubmitted=true;

    const data = {

    address:

    document
        .getElementById("addressField")
        .value
        .trim()

};

    console.log(data);

    /*
        Firebase save comes in Part 3
    */

    setTimeout(showThankYou,800);

}
