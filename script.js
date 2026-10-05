/* ========================= */
/* SCREEN SYSTEM */
/* ========================= */

function showScreen(id) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    const target =
        document.getElementById(id);

    if (target) {

        target.classList.add("active");

    }

}


/* ========================= */
/* START */
/* ========================= */

function startGame() {

    showScreen("intro");

}


/* ========================= */
/* GAME 1 */
/* CATCH THE CAKE */
/* ========================= */

/* ========================= */
/* GAME 1 */
/* CATCH THE FALLING CAKE */
/* ========================= */

let cakeScore = 0;

let cakeGameRunning = false;

let cakeAnimation;

let cakeY = -60;

let cakeX = 0;

let cakeSpeed = 3;


/* ========================= */
/* START GAME */
/* ========================= */

function startCakeGame() {

    cakeScore = 0;

    cakeGameRunning = true;

    document.getElementById(
        "cakeScore"
    ).textContent = "0";

    document.getElementById(
        "game1Message"
    ).textContent = "";

    spawnCake();

}


/* ========================= */
/* SPAWN CAKE */
/* ========================= */

function spawnCake() {

    const game =
        document.getElementById(
            "catchGame"
        );

    const cake =
        document.getElementById(
            "fallingCake"
        );


    const gameWidth =
        game.clientWidth;


    /*
     * Random horizontal position
     */

    cakeX =
        30 +
        Math.random() *
        (gameWidth - 60);


    cakeY = -60;


    cake.style.left =
        cakeX + "px";

    cake.style.top =
        cakeY + "px";

    cake.style.transform =
        "translateX(-50%)";


    cake.style.opacity = "1";


    /*
     * Random speed
     */

    cakeSpeed =
        3 +
        Math.random() * 2;


    moveCake();

}


/* ========================= */
/* MOVE CAKE DOWN */
/* ========================= */

function moveCake() {

    if (!cakeGameRunning) return;


    const game =
        document.getElementById(
            "catchGame"
        );

    const cake =
        document.getElementById(
            "fallingCake"
        );


    cakeY += cakeSpeed;


    cake.style.top =
        cakeY + "px";


    /*
     * Box position
     */

    const box =
        document.getElementById(
            "catchBox"
        );


    const boxRect =
        box.getBoundingClientRect();

    const gameRect =
        game.getBoundingClientRect();


    const boxLeft =
        boxRect.left -
        gameRect.left;

    const boxRight =
        boxLeft +
        boxRect.width;


    const cakeLeft =
        cakeX - 25;

    const cakeRight =
        cakeX + 25;


    /*
     * Check if cake reaches box
     */

    if (
        cakeY > 285 &&
        cakeY < 350
    ) {

        /*
         * Cake overlaps box
         */

        if (
            cakeRight >= boxLeft &&
            cakeLeft <= boxRight
        ) {

            cakeCaught();

            return;

        }

    }


    /*
     * Cake missed
     */

    if (
        cakeY >
        game.clientHeight
    ) {

        cakeMiss();

        return;

    }


    cakeAnimation =
        requestAnimationFrame(
            moveCake
        );

}


/* ========================= */
/* CAKE CAUGHT */
/* ========================= */

function cakeCaught() {

    cancelAnimationFrame(
        cakeAnimation
    );


    const cake =
        document.getElementById(
            "fallingCake"
        );


    cake.style.animation =
        "cakeCaught 0.3s forwards";


    cakeScore++;


    document.getElementById(
        "cakeScore"
    ).textContent =
        cakeScore;


    if (cakeScore >= 5) {

        cakeGameRunning = false;


        document.getElementById(
            "game1Message"
        ).textContent =
            "🎉 PERFECT! You caught all the cakes!";


        setTimeout(() => {

            showScreen("game2");

            startReflexGame();

        }, 1500);


    }

    else {

        setTimeout(() => {

            cake.style.animation = "";

            spawnCake();

        }, 400);

    }

}


/* ========================= */
/* CAKE MISSED */
/* ========================= */

function cakeMiss() {

    cancelAnimationFrame(
        cakeAnimation
    );


    document.getElementById(
        "game1Message"
    ).textContent =
        "💨 Missed! Catch the next one!";


    setTimeout(() => {

        document.getElementById(
            "game1Message"
        ).textContent = "";

        spawnCake();

    }, 500);

}


/* ========================= */
/* MOVE BOX WITH MOUSE */
/* ========================= */

const catchGame =
    document.getElementById(
        "catchGame"
    );


const catchBox =
    document.getElementById(
        "catchBox"
    );


let isDragging =
    false;


if (catchGame && catchBox) {


    catchGame.addEventListener(
        "mousemove",
        function(event) {

            moveBox(
                event.clientX
            );

        }
    );


    catchGame.addEventListener(
        "mousedown",
        function(event) {

            isDragging = true;

            moveBox(
                event.clientX
            );

        }
    );


    document.addEventListener(
        "mouseup",
        function() {

            isDragging = false;

        }
    );


    /*
     * TOUCH / MOBILE
     */

    catchGame.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            const touch =
                event.touches[0];

            moveBox(
                touch.clientX
            );

        },
        {
            passive: false
        }
    );


    catchGame.addEventListener(
        "touchmove",
        function(event) {

            event.preventDefault();

            const touch =
                event.touches[0];

            moveBox(
                touch.clientX
            );

        },
        {
            passive: false
        }
    );

}


/* ========================= */
/* MOVE BOX */
/* ========================= */

function moveBox(clientX) {

    const game =
        document.getElementById(
            "catchGame"
        );

    const box =
        document.getElementById(
            "catchBox"
        );


    if (!game || !box) return;


    const rect =
        game.getBoundingClientRect();


    let x =
        clientX -
        rect.left;


    const halfBox =
        box.offsetWidth / 2;


    /*
     * Prevent box from
     * leaving game area
     */

    if (
        x < halfBox
    ) {

        x = halfBox;

    }


    if (
        x >
        rect.width - halfBox
    ) {

        x =
            rect.width -
            halfBox;

    }


    box.style.left =
        x + "px";

}

/* =========================
   GAME 2 - REFLEX
========================= */

let starScore = 0;

const totalStars = 5;


/* =========================
   START GAME 2
========================= */

function startReflexGame() {

    starScore = 0;

    const score =
        document.getElementById("starScore");

    const message =
        document.getElementById("game2Message");

    if (score) {
        score.textContent = "0";
    }

    if (message) {
        message.textContent = "";
    }


    const buttons =
        Array.from(
            document.querySelectorAll(".reflex-grid button")
        );


    // =========================
    // RESET SEMUA TOMBOL
    // =========================

    buttons.forEach(button => {

        button.textContent = "❌";

        button.onclick = function () {
            wrongReflex(this);
        };

    });


    // =========================
    // RANDOM POSISI ⭐
    // =========================

    const shuffledButtons =
        [...buttons].sort(
            () => Math.random() - 0.5
        );


    // 3 ⭐ awal
    shuffledButtons
        .slice(0, 3)
        .forEach(button => {

            button.textContent = "⭐";

            button.onclick = function () {
                clickStar(this);
            };

        });
}


/* =========================
   CLICK STAR
========================= */

function clickStar(button) {

    // Tambah score
    starScore++;


    const score =
        document.getElementById("starScore");

    const message =
        document.getElementById("game2Message");


    if (score) {
        score.textContent = starScore;
    }


    if (message) {
        message.textContent = "⭐ Nice!";
    }


    // =========================
    // BINTANG YANG DIKLIK
    // JADI ❌
    // =========================

    button.textContent = "❌";

    button.onclick = function () {
        wrongReflex(this);
    };


    // =========================
    // SUDAH 5?
    // =========================

    if (starScore >= totalStars) {

        if (message) {
            message.textContent =
                "⚡ PERFECT REFLEX! 🎉";
        }

        setTimeout(() => {

            showScreen("game3");

            startMemoryGame();

        }, 800);

        return;
    }


    // =========================
    // CARI POSISI BARU
    // =========================

    const buttons =
        Array.from(
            document.querySelectorAll(".reflex-grid button")
        );


    // Ambil tombol yang sekarang ❌
    const availableButtons =
        buttons.filter(
            btn => btn.textContent !== "⭐"
        );


    if (availableButtons.length === 0) {
        return;
    }


    // Random posisi ⭐ baru
    const randomButton =
        availableButtons[
            Math.floor(
                Math.random() *
                availableButtons.length
            )
        ];


    randomButton.textContent = "⭐";

    randomButton.onclick = function () {
        clickStar(this);
    };
}


/* =========================
   CLICK ❌
========================= */

function wrongReflex(button) {

    const message =
        document.getElementById("game2Message");

    if (message) {
        message.textContent =
            "❌ That's not a star!";
    }

}


/* =========================
   GAME 3 - MEMORY SEQUENCE
========================= */

const memorySequence = ["🎈", "🍰", "🎁", "🧸"];

let memoryIndex = 0;


/* =========================
   SHUFFLE PILIHAN
========================= */

function shuffleMemoryChoices() {

    const choices = [...memorySequence];

    for (let i = choices.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [choices[i], choices[j]] =
            [choices[j], choices[i]];
    }

    return choices;
}


/* =========================
   START GAME
========================= */

function startMemoryGame() {

    memoryIndex = 0;

    const objects =
        document.getElementById("memoryObjects");

    const question =
        document.getElementById("memoryQuestion");

    const instruction =
        document.getElementById("memoryInstruction");

    const message =
        document.getElementById("game3Message");

    const progress =
        document.getElementById("memoryProgress");


    // Reset
    objects.classList.remove("hidden");

    question.classList.add("hidden");

    message.textContent = "";

    progress.textContent = "0 / 4";

    instruction.textContent =
        "Remember the order!";


    // Tampilkan sequence selama 4 detik
    setTimeout(() => {

        objects.classList.add("hidden");

        question.classList.remove("hidden");

        instruction.textContent =
            "Now repeat the sequence!";


        // =========================
        // RANDOM PILIHAN GANDA
        // =========================

        const shuffledChoices =
            shuffleMemoryChoices();

        const buttons =
            question.querySelectorAll("button");

        buttons.forEach((button, index) => {

            if (shuffledChoices[index]) {

                button.textContent =
                    shuffledChoices[index];

                button.onclick = () => {

                    memoryAnswer(
                        shuffledChoices[index]
                    );

                };

            }

        });

    }, 4000);
}


/* =========================
   CEK JAWABAN
========================= */

function memoryAnswer(answer) {

    const message =
        document.getElementById("game3Message");

    const progress =
        document.getElementById("memoryProgress");


    // =========================
    // JAWABAN BENAR
    // =========================

    if (answer === memorySequence[memoryIndex]) {

        memoryIndex++;

        progress.textContent =
            memoryIndex + " / 4";

        message.textContent =
            "✅ Correct!";


        // BELUM SELESAI
        if (memoryIndex < memorySequence.length) {

            return;

        }


        // =========================
        // SEMUA 4 BENAR
        // =========================

        message.textContent =
            "🧠 PERFECT MEMORY! 🎉";

        setTimeout(() => {

            showScreen("game4");

        }, 1200);

    }


    // =========================
    // JAWABAN SALAH
    // =========================

    else {

        message.textContent =
            "❌ Wrong order! Start again!";

        progress.textContent =
            "0 / 4";

        memoryIndex = 0;

    }
}

/* ========================= */
/* GAME 4 */
/* SECRET CODE */
/* ========================= */

function checkCode() {

    const input =
        document.getElementById(
            "codeInput"
        );

    const message =
        document.getElementById(
            "game4Message"
        );


    const answer =
        input.value.trim();


    /*
     * BIRTHDAY = 8 letters
     */

    if (answer === "8") {

        message.textContent =
            "🔓 SECURITY LEVEL 04 CLEARED!";


        setTimeout(() => {

            showScreen("unlocked");

        }, 1200);

    }

    else {

        message.textContent =
            "❌ Wrong code. Read the clue again.";

        input.classList.add("wrong");


        setTimeout(() => {

            input.classList.remove("wrong");

        }, 400);

    }

}


/* ========================= */
/* PREPARE SHAKE */
/* ========================= */

function prepareShake() {

    showScreen("shakeScreen");

}


/* ========================= */
/* SHAKE SYSTEM */
/* ========================= */

let shakeCount = 0;

let lastShake = 0;

let shakeEnabled = false;


function enableMotion() {

    /*
     * iPhone/iPad requires permission
     * before accessing motion sensors.
     */

    if (
        typeof DeviceMotionEvent !==
        "undefined" &&
        typeof DeviceMotionEvent
            .requestPermission ===
            "function"
    ) {

        DeviceMotionEvent
            .requestPermission()
            .then(permission => {

                if (
                    permission ===
                    "granted"
                ) {

                    startMotionDetection();

                }

                else {

                    document.getElementById(
                        "shakeStatus"
                    ).textContent =
                        "Permission denied. Use manual shake.";

                }

            })
            .catch(() => {

                document.getElementById(
                    "shakeStatus"
                ).textContent =
                    "Please use the manual button.";

            });

    }

    else {

        startMotionDetection();

    }

}


function startMotionDetection() {

    shakeEnabled = true;


    document.getElementById(
        "motionButton"
    ).textContent =
        "SHAKE NOW! 📱";


    document.getElementById(
        "shakeStatus"
    ).textContent =
        "Shake your phone!";


    window.addEventListener(
        "devicemotion",
        detectShake
    );

}


function detectShake(event) {

    if (!shakeEnabled) return;


    const acceleration =
        event.accelerationIncludingGravity;


    if (!acceleration) return;


    const x =
        acceleration.x || 0;

    const y =
        acceleration.y || 0;

    const z =
        acceleration.z || 0;


    const magnitude =
        Math.sqrt(
            x * x +
            y * y +
            z * z
        );


    const now =
        Date.now();


    /*
     * Prevent one shake from
     * being counted multiple times.
     */

    if (
        magnitude > 20 &&
        now - lastShake > 700
    ) {

        lastShake = now;

        registerShake();

    }

}


/* ========================= */
/* REGISTER SHAKE */
/* ========================= */

function registerShake() {

    shakeCount++;


    if (shakeCount > 3) {

        shakeCount = 3;

    }


    updateShakeDisplay();


    if (shakeCount >= 3) {

        shakeEnabled = false;


        document.getElementById(
            "shakeStatus"
        ).textContent =
            "🔓 BOX UNLOCKED!";


        setTimeout(() => {

            openBox();

            function showBirthday() {
    showScreen("birthday");
}

            

        }, 1000);

    }

}


/* ========================= */
/* SHAKE DISPLAY */
/* ========================= */

function updateShakeDisplay() {

    const circles = [
        document.getElementById("shake1"),
        document.getElementById("shake2"),
        document.getElementById("shake3")
    ];


    circles.forEach(
        (circle, index) => {

            if (
                index <
                shakeCount
            ) {

                circle.textContent =
                    "●";

            }

            else {

                circle.textContent =
                    "○";

            }

        }
    );

}


/* ========================= */
/* MANUAL SHAKE */
/* ========================= */

function simulateShake() {

    registerShake();

}


/* ========================= */
/* OPEN BOX */
/* ========================= */


function openBox() {
    showScreen("boxOpening");

    const box = document.getElementById("bigOpeningBox");
    const lid = document.getElementById("boxTop");
    const flash = document.getElementById("boomFlash");
    const letter = document.getElementById("birthdayLetter");
    const boomText = document.getElementById("boomText");

    // Reset
    box.classList.remove("explode");
    lid.classList.remove("open");
    letter.classList.remove("show");

    // Hilangkan tulisan boom
    if (boomText) {
        boomText.style.display = "none";
    }

    // Langsung buka box
    setTimeout(() => {
        lid.classList.add("open");
        box.classList.add("explode");

        // Flash
        if (flash) {
            flash.classList.remove("flash");
            void flash.offsetWidth;
            flash.classList.add("flash");
        }

        // Confetti
        createConfetti();

    }, 200);

    // Surat muncul cepat setelah box terbuka
    setTimeout(() => {
        letter.classList.add("show");
    }, 800);

    // Pindah ke birthday setelah surat sempat dibaca
    setTimeout(() => {
        showBirthday();
    }, 5500);
}



function createConfetti() {

    const container = document.getElementById("confettiContainer");

    container.innerHTML = "";

    const pieces = [
        "🎉",
        "✨",
        "💖",
        "💕",
        "🎀",
        "⭐",
        "🌸",
        "🎊",
        "💗",
        "🥳"
    ];

    // Banyak banget confetti
    for (let i = 0; i < 120; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.textContent =
            pieces[Math.floor(Math.random() * pieces.length)];

        // Arah ledakan random
        const blastX =
            (Math.random() - 0.5) * window.innerWidth * 1.5;

        const blastY =
            (Math.random() - 0.5) * window.innerHeight * 0.9;

        const fallX =
            (Math.random() - 0.5) * window.innerWidth * 1.5;

        const rotation =
            Math.random() * 720 - 360;

        confetti.style.setProperty(
            "--blast-x",
            `${blastX}px`
        );

        confetti.style.setProperty(
            "--blast-y",
            `${blastY}px`
        );

        confetti.style.setProperty(
            "--fall-x",
            `${fallX}px`
        );

        confetti.style.setProperty(
            "--rotation",
            `${rotation}deg`
        );

        confetti.style.fontSize =
            `${18 + Math.random() * 25}px`;

        confetti.style.animationDelay =
            `${Math.random() * 0.4}s`;

        container.appendChild(confetti);
    }
}

/* ========================= */
/* FINAL SURPRISE */
/* ========================= */



/* ========================= */
/* INITIALIZE */
/* ========================= */
