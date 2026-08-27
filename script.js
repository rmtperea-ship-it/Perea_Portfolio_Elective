document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE START
    ===================================================== */

    document.body.classList.add("page-loaded");


    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navLinks = document.querySelectorAll(".navbar nav a");
    const logo = document.querySelector(".logo");

    /*
       MAIN NAVIGATION

       Normal links:
       HOME
       ABOUT
       SKILLS
       WORK
       ELECTIVE
    */

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            /*
               IMPORTANT:
               Kapag ELECTIVE ang pinindot,
               automatic na QUIZ ang active.
            */

            if (
                href.toLowerCase().includes("elective")
            ) {

                setTimeout(() => {

                    const quizButton =
                        document.querySelector(
                            '.nav-btn[data-target="quizSection"]'
                        );

                    const navButtons =
                        document.querySelectorAll(".nav-btn");

                    navButtons.forEach(btn => {
                        btn.classList.remove("active");
                    });

                    if (quizButton) {
                        quizButton.classList.add("active");
                    }

                }, 150);

            }

        });

    });


    /* =====================================================
       LOGO
    ===================================================== */

    if (logo) {

        logo.addEventListener("click", e => {

            const home =
                document.querySelector("#home");

            if (!home) return;

            e.preventDefault();

            home.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progress =
        document.createElement("div");

    progress.className =
        "scroll-progress";

    document.body.appendChild(progress);


    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");


    function updateNavigation() {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 250;

            const bottom =
                top + section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < bottom
            ) {

                current =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateNavigation,
        {
            passive: true
        }
    );


    updateNavigation();


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    if (window.innerWidth > 800) {

        const cursor =
            document.createElement("div");

        const cursorDot =
            document.createElement("div");

        cursor.className =
            "custom-cursor";

        cursorDot.className =
            "cursor-dot";

        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);


        let mouseX = 0;
        let mouseY = 0;

        let cursorX = 0;
        let cursorY = 0;


        document.addEventListener(
            "mousemove",
            e => {

                mouseX =
                    e.clientX;

                mouseY =
                    e.clientY;

                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        function animateCursor() {

            cursorX +=
                (mouseX - cursorX) * 0.15;

            cursorY +=
                (mouseY - cursorY) * 0.15;

            cursor.style.left =
                `${cursorX}px`;

            cursor.style.top =
                `${cursorY}px`;

            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        const interactive =
            document.querySelectorAll(
                "a, button, .skill-box, .work-img, .about-photo"
            );


        interactive.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.classList.add(
                        "cursor-active"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.classList.remove(
                        "cursor-active"
                    );

                }
            );

        });

    }


    /* =====================================================
       MOUSE SPOTLIGHT
    ===================================================== */

    const spotlight =
        document.createElement("div");

    spotlight.className =
        "cursor-spotlight";

    document.body.appendChild(
        spotlight
    );


    document.addEventListener(
        "mousemove",
        e => {

            spotlight.style.left =
                `${e.clientX}px`;

            spotlight.style.top =
                `${e.clientY}px`;

        }
    );


    /* =====================================================
       HERO TEXT REVEAL
    ===================================================== */

    const introTitle =
        document.querySelector(".intro h1");


    if (introTitle) {

        introTitle.innerHTML =
            `<span class="hero-line">Hello,</span>
             <span class="hero-line">I'm Rachelle</span>`;


        const lines =
            introTitle.querySelectorAll(
                ".hero-line"
            );


        lines.forEach((line, index) => {

            line.style.animationDelay =
                `${0.25 + index * 0.18}s`;

        });

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");


    if (hero) {

        const shapes = [

            {
                element:
                    document.querySelector(
                        ".green-shape"
                    ),
                strength: 14
            },

            {
                element:
                    document.querySelector(
                        ".yellow-circle"
                    ),
                strength: -20
            },

            {
                element:
                    document.querySelector(
                        ".white-circle"
                    ),
                strength: 25
            },

            {
                element:
                    document.querySelector(
                        ".green-box"
                    ),
                strength: -13
            },

            {
                element:
                    document.querySelector(
                        ".small-yellow-circle"
                    ),
                strength: 30
            }

        ];


        hero.addEventListener(
            "mousemove",
            e => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (e.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (e.clientY - rect.top) /
                    rect.height -
                    0.5;


                shapes.forEach(item => {

                    if (!item.element) return;

                    item.element.style.setProperty(
                        "--mx",
                        `${x * item.strength}px`
                    );

                    item.element.style.setProperty(
                        "--my",
                        `${y * item.strength}px`
                    );

                });

            }
        );

    }


    /* =====================================================
       PROFILE 3D
    ===================================================== */

    const profile =
        document.querySelector(
            ".profile-container"
        );


    if (profile) {

        profile.addEventListener(
            "mousemove",
            e => {

                const rect =
                    profile.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 12;

                const rotateX =
                    ((y / rect.height) - 0.5) * -12;


                profile.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.025)
                    `;

            }
        );


        profile.addEventListener(
            "mouseleave",
            () => {

                profile.style.transform =
                    `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale(1)
                    `;

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .about-left,
            .about-right,
            .skills-title,
            .skill-box,
            .work-title,
            .work-img
            `
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal-element"
            );

        }
    );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element =>
            revealObserver.observe(element)
    );


    /* =====================================================
       SKILLS MAGNETIC EFFECT
    ===================================================== */

    const skills =
        document.querySelectorAll(
            ".skill-box"
        );


    skills.forEach((card, index) => {

        card.style.setProperty(
            "--delay",
            `${index * 120}ms`
        );


        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 8;

                const rotateX =
                    ((y / rect.height) - 0.5) * -8;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-14px)
                    scale(1.035)
                    `;


                card.style.setProperty(
                    "--card-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--card-y",
                    `${y}px`
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       WORK GALLERY DEPTH
    ===================================================== */

    const workImages =
        document.querySelectorAll(
            ".work-img"
        );


    workImages.forEach((image, index) => {

        image.style.setProperty(
            "--work-delay",
            `${index * 70}ms`
        );


        image.addEventListener(
            "mousemove",
            e => {

                const rect =
                    image.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                const rotateY =
                    ((x / rect.width) - 0.5) * 7;

                const rotateX =
                    ((y / rect.height) - 0.5) * -7;


                image.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.055)
                    `;

            }
        );


        image.addEventListener(
            "mouseleave",
            () => {

                image.style.transform = "";

            }
        );

    });


    /* =====================================================
       IMAGE CLICK RIPPLE
    ===================================================== */

    workImages.forEach(image => {

        image.addEventListener(
            "click",
            e => {

                const ripple =
                    document.createElement("span");

                ripple.className =
                    "click-ripple";


                const rect =
                    image.getBoundingClientRect();


                ripple.style.left =
                    `${e.clientX - rect.left}px`;

                ripple.style.top =
                    `${e.clientY - rect.top}px`;


                image.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 700);

            }
        );

    });


    /* =====================================================
       SOCIAL ICON MAGNET
    ===================================================== */

    const socials =
        document.querySelectorAll(
            ".socials a"
        );


    socials.forEach(icon => {

        icon.addEventListener(
            "mousemove",
            e => {

                const rect =
                    icon.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    e.clientY -
                    rect.top -
                    rect.height / 2;


                icon.style.transform =
                    `
                    translate(
                        ${x * 0.25}px,
                        ${y * 0.25}px
                    )
                    scale(1.12)
                    `;

            }
        );


        icon.addEventListener(
            "mouseleave",
            () => {

                icon.style.transform = "";

            }
        );

    });


    /* =====================================================
       ABOUT PHOTO PARALLAX
    ===================================================== */

    const aboutPhoto =
        document.querySelector(
            ".about-photo"
        );


    if (aboutPhoto) {

        aboutPhoto.addEventListener(
            "mousemove",
            e => {

                const rect =
                    aboutPhoto.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;


                const moveX =
                    ((x / rect.width) - 0.5) * 12;

                const moveY =
                    ((y / rect.height) - 0.5) * 12;


                aboutPhoto.style.transform =
                    `
                    translate(
                        ${moveX}px,
                        ${moveY}px
                    )
                    rotate(
                        ${moveX * 0.15}deg
                    )
                    `;

            }
        );


        aboutPhoto.addEventListener(
            "mouseleave",
            () => {

                aboutPhoto.style.transform = "";

            }
        );

    }


    /* =====================================================
       SCROLL VELOCITY
    ===================================================== */

    let lastScroll =
        window.scrollY;

    let scrollSpeed = 0;


    window.addEventListener(
        "scroll",
        () => {

            const current =
                window.scrollY;

            scrollSpeed =
                current - lastScroll;

            lastScroll =
                current;


            document.documentElement.style.setProperty(
                "--scroll-speed",
                `${Math.min(
                    Math.abs(scrollSpeed),
                    25
                )}px`
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       SECTION COLOR MODE
    ===================================================== */

    const skillsSection =
        document.querySelector("#skills");

    const workSection =
        document.querySelector("#work");

    const aboutSection =
        document.querySelector("#about");


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        document.body.dataset.section =
                            entry.target.id;

                    }

                });

            },
            {
                threshold: 0.4
            }
        );


    [
        skillsSection,
        workSection,
        aboutSection,
        hero
    ].forEach(section => {

        if (section) {

            observer.observe(section);

        }

    });


    /* =====================================================
       ESCAPE RESET
    ===================================================== */

    document.addEventListener(
        "keydown",
        e => {

            if (e.key === "Escape") {

                skills.forEach(card => {

                    card.style.transform = "";

                });


                workImages.forEach(image => {

                    image.style.transform = "";

                });

            }

        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }

});



/* =========================================================
   ELECTIVE FILE SYSTEM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =================================
           INPUTS
        ================================= */

        const quizInput =
            document.getElementById(
                "quizInput"
            );

        const labInput =
            document.getElementById(
                "labInput"
            );

        const examInput =
            document.getElementById(
                "examInput"
            );


        /* =================================
           CONTAINERS
        ================================= */

        const quizCards =
            document.getElementById(
                "quizCards"
            );

        const labCards =
            document.getElementById(
                "labCards"
            );

        const quizScroll =
            document.getElementById(
                "quizScroll"
            );

        const labScroll =
            document.getElementById(
                "labScroll"
            );


        /* =================================
           STORAGE
        ================================= */

        const QUIZ_STORAGE =
            "rm_elective_quiz";

        const LAB_STORAGE =
            "rm_elective_lab";

        const EXAM_STORAGE =
            "rm_elective_exam";


        /* =================================
           DELETE PASSWORD
        ================================= */

        const DELETE_PASSWORD =
            "143";


        /* =================================
           PASSWORD ELEMENTS
        ================================= */

        const passwordModal =
            document.getElementById(
                "passwordModal"
            );

        const deletePassword =
            document.getElementById(
                "deletePassword"
            );

        const passwordError =
            document.getElementById(
                "passwordError"
            );

        const confirmDelete =
            document.getElementById(
                "confirmDelete"
            );

        const closePassword =
            document.getElementById(
                "closePassword"
            );


        let pendingDelete = null;


        /* =================================
           GET SAVED DATA
        ================================= */

        function getSaved(key) {

            return JSON.parse(
                localStorage.getItem(key) ||
                "[]"
            );

        }


        /* =================================
           SAVE DATA
        ================================= */

        function saveData(key, data) {

            localStorage.setItem(
                key,
                JSON.stringify(data)
            );

        }


        /* =================================
           READ FILE
        ================================= */

        function readFile(file) {

            return new Promise(function (resolve) {

                const reader =
                    new FileReader();


                reader.onload = function () {

                    resolve({

                        name:
                            file.name,

                        type:
                            file.type,

                        data:
                            reader.result

                    });

                };


                reader.readAsDataURL(file);

            });

        }


        /* =================================
           ASK PASSWORD
        ================================= */

        function requestDelete(callback) {

            pendingDelete =
                callback;

            deletePassword.value = "";

            passwordError.classList.remove(
                "show"
            );

            passwordModal.classList.add(
                "show"
            );


            setTimeout(function () {

                deletePassword.focus();

            }, 100);

        }


        /* =================================
           CONFIRM DELETE
        ================================= */

        confirmDelete.addEventListener(
            "click",
            function () {

                if (
                    deletePassword.value ===
                    DELETE_PASSWORD
                ) {

                    passwordModal.classList.remove(
                        "show"
                    );

                    passwordError.classList.remove(
                        "show"
                    );


                    if (pendingDelete) {

                        pendingDelete();

                        pendingDelete =
                            null;

                    }

                }
                else {

                    passwordError.classList.add(
                        "show"
                    );

                    deletePassword.value = "";

                    deletePassword.focus();

                }

            }
        );


        /* =================================
           ENTER PASSWORD
        ================================= */

        deletePassword.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    confirmDelete.click();

                }

            }
        );


        /* =================================
           CLOSE PASSWORD
        ================================= */

        closePassword.addEventListener(
            "click",
            function () {

                passwordModal.classList.remove(
                    "show"
                );

                deletePassword.value = "";

                passwordError.classList.remove(
                    "show"
                );

                pendingDelete =
                    null;

            }
        );


        /* =================================
           CLICK OUTSIDE PASSWORD
        ================================= */

        passwordModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    passwordModal
                ) {

                    passwordModal.classList.remove(
                        "show"
                    );

                    deletePassword.value = "";

                    passwordError.classList.remove(
                        "show"
                    );

                    pendingDelete =
                        null;

                }

            }
        );


        /* =================================
           OPEN FILE
        ================================= */

        function openFile(file) {

            /* IMAGE */

            if (
                file.type &&
                file.type.startsWith(
                    "image/"
                )
            ) {

                const viewer =
                    document.getElementById(
                        "fileViewer"
                    );

                const image =
                    document.getElementById(
                        "viewerImage"
                    );


                image.src =
                    file.data;

                viewer.classList.add(
                    "show"
                );

            }


            /* PDF */

            else if (
                file.type ===
                "application/pdf"
            ) {

                const pdfWindow =
                    window.open();


                if (pdfWindow) {

                    pdfWindow.document.write(`

                        <!DOCTYPE html>

                        <html>

                        <head>

                            <title>
                                ${file.name}
                            </title>

                            <style>

                                html,
                                body {

                                    margin: 0;
                                    padding: 0;

                                    width: 100%;
                                    height: 100%;

                                    overflow: hidden;

                                    background: #222;

                                }

                                iframe {

                                    width: 100%;
                                    height: 100%;

                                    border: none;

                                }

                            </style>

                        </head>


                        <body>

                            <iframe
                                src="${file.data}">
                            </iframe>

                        </body>

                        </html>

                    `);

                    pdfWindow.document.close();

                }

            }

        }


        /* =================================
           CREATE QUIZ / LAB CARD
        ================================= */

        function createCard(
            file,
            number,
            index,
            storageKey,
            container,
            scroll
        ) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "attachment-card";


            /* IMAGE */

            if (
                file.type &&
                file.type.startsWith(
                    "image/"
                )
            ) {

                const img =
                    document.createElement(
                        "img"
                    );

                img.src =
                    file.data;

                img.alt =
                    file.name;

                card.appendChild(img);

            }


            /* PDF */

            else if (
                file.type ===
                "application/pdf"
            ) {

                card.classList.add(
                    "pdf-card"
                );


                const icon =
                    document.createElement(
                        "i"
                    );

                icon.className =
                    "fa-solid fa-file-pdf";

                card.appendChild(icon);


                const name =
                    document.createElement(
                        "div"
                    );

                name.className =
                    "pdf-name";

                name.textContent =
                    file.name;

                card.appendChild(name);

            }


            /* OPEN FILE */

            card.addEventListener(
                "click",
                function () {

                    openFile(file);

                }
            );


            /* DELETE BUTTON */

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.className =
                "delete-card";


            deleteButton.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';


            deleteButton.title =
                "Delete file";


            deleteButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    requestDelete(
                        function () {

                            const saved =
                                getSaved(
                                    storageKey
                                );


                            saved.splice(
                                index,
                                1
                            );


                            saveData(
                                storageKey,
                                saved
                            );


                            renderCards(
                                saved,
                                container,
                                scroll,
                                storageKey
                            );

                        }
                    );

                }
            );


            card.appendChild(
                deleteButton
            );


            /* NUMBER */

            const numberLabel =
                document.createElement(
                    "span"
                );


            numberLabel.className =
                "card-number";


            numberLabel.textContent =
                number;


            card.appendChild(
                numberLabel
            );


            return card;

        }


        /* =================================
           RENDER QUIZ / LAB
        ================================= */

        function renderCards(
            data,
            container,
            scroll,
            storageKey
        ) {

            if (!container || !scroll) {
                return;
            }


            container.innerHTML = "";


            data.forEach(
                function (file, index) {

                    container.appendChild(
                        createCard(
                            file,
                            index + 1,
                            index,
                            storageKey,
                            container,
                            scroll
                        )
                    );

                }
            );


            scroll.classList.remove(
                "has-scroll"
            );


            if (data.length >= 7) {

                scroll.classList.add(
                    "has-scroll"
                );

            }

        }


        /* =================================
           QUIZ ATTACH
        ================================= */

        if (quizInput) {

            quizInput.addEventListener(
                "change",
                async function () {

                    const saved =
                        getSaved(
                            QUIZ_STORAGE
                        );


                    for (
                        const file
                        of quizInput.files
                    ) {

                        saved.push(
                            await readFile(file)
                        );

                    }


                    saveData(
                        QUIZ_STORAGE,
                        saved
                    );


                    renderCards(
                        saved,
                        quizCards,
                        quizScroll,
                        QUIZ_STORAGE
                    );


                    quizInput.value = "";

                }
            );

        }


        /* =================================
           LAB ATTACH
        ================================= */

        if (labInput) {

            labInput.addEventListener(
                "change",
                async function () {

                    const saved =
                        getSaved(
                            LAB_STORAGE
                        );


                    for (
                        const file
                        of labInput.files
                    ) {

                        saved.push(
                            await readFile(file)
                        );

                    }


                    saveData(
                        LAB_STORAGE,
                        saved
                    );


                    renderCards(
                        saved,
                        labCards,
                        labScroll,
                        LAB_STORAGE
                    );


                    labInput.value = "";

                }
            );

        }


        /* =================================
           EXAM ATTACH
        ================================= */

        if (examInput) {

            examInput.addEventListener(
                "change",
                async function () {

                    const saved =
                        getSaved(
                            EXAM_STORAGE
                        );


                    for (
                        const file
                        of examInput.files
                    ) {

                        if (
                            saved.length >= 3
                        ) {

                            break;

                        }


                        saved.push(
                            await readFile(file)
                        );

                    }


                    saveData(
                        EXAM_STORAGE,
                        saved
                    );


                    renderExam(saved);


                    examInput.value = "";

                }
            );

        }


        /* =================================
           RENDER EXAM
        ================================= */

        function renderExam(data) {

            const cards =
                document.querySelectorAll(
                    ".exam-card"
                );


            cards.forEach(
                function (card, index) {

                    const area =
                        card.querySelector(
                            ".exam-file"
                        );


                    if (!area) return;


                    area.innerHTML = "";


                    const oldDelete =
                        card.querySelector(
                            ".exam-delete"
                        );


                    if (oldDelete) {

                        oldDelete.remove();

                    }


                    /* NO FILE */

                    if (!data[index]) {

                        card.onclick =
                            null;

                        return;

                    }


                    const file =
                        data[index];


                    /* IMAGE */

                    if (
                        file.type &&
                        file.type.startsWith(
                            "image/"
                        )
                    ) {

                        const img =
                            document.createElement(
                                "img"
                            );


                        img.src =
                            file.data;

                        img.alt =
                            file.name;


                        area.appendChild(
                            img
                        );

                    }


                    /* PDF */

                    else {

                        const icon =
                            document.createElement(
                                "i"
                            );


                        icon.className =
                            "fa-solid fa-file-pdf";


                        area.appendChild(
                            icon
                        );

                    }


                    /* OPEN FILE */

                    card.onclick =
                        function () {

                            openFile(file);

                        };


                    /* DELETE BUTTON */

                    const deleteButton =
                        document.createElement(
                            "button"
                        );


                    deleteButton.className =
                        "exam-delete";


                    deleteButton.innerHTML =
                        '<i class="fa-solid fa-xmark"></i>';


                    deleteButton.title =
                        "Delete file";


                    deleteButton.onclick =
                        function (event) {

                            event.stopPropagation();


                            requestDelete(
                                function () {

                                    const currentData =
                                        getSaved(
                                            EXAM_STORAGE
                                        );


                                    currentData.splice(
                                        index,
                                        1
                                    );


                                    saveData(
                                        EXAM_STORAGE,
                                        currentData
                                    );


                                    renderExam(
                                        currentData
                                    );

                                }
                            );

                        };


                    card.appendChild(
                        deleteButton
                    );

                }
            );

        }


        /* =================================
           CLOSE IMAGE VIEWER
        ================================= */

        const fileViewer =
            document.getElementById(
                "fileViewer"
            );

        const closeViewer =
            document.getElementById(
                "closeViewer"
            );


        if (
            fileViewer &&
            closeViewer
        ) {

            closeViewer.addEventListener(
                "click",
                function () {

                    fileViewer.classList.remove(
                        "show"
                    );


                    const viewerImage =
                        document.getElementById(
                            "viewerImage"
                        );


                    if (viewerImage) {

                        viewerImage.src = "";

                    }

                }
            );


            /* =================================
               CLICK OUTSIDE IMAGE
            ================================= */

            fileViewer.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        fileViewer
                    ) {

                        fileViewer.classList.remove(
                            "show"
                        );


                        const viewerImage =
                            document.getElementById(
                                "viewerImage"
                            );


                        if (viewerImage) {

                            viewerImage.src = "";

                        }

                    }

                }
            );

        }


        /* =================================================
           QUIZ / EXAM / LAB NAVIGATION
        ================================================= */

        const navButtons =
            document.querySelectorAll(
                ".nav-btn"
            );


        function activateTab(button) {

            if (!button) return;


            const targetId =
                button.dataset.target;


            const target =
                document.getElementById(
                    targetId
                );


            if (!target) {
                return;
            }


            /* REMOVE ACTIVE */

            navButtons.forEach(
                function (btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            /* ACTIVE BUTTON */

            button.classList.add(
                "active"
            );


            /* SCROLL */

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        navButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();

                        activateTab(button);

                    }
                );

            }
        );


        /* =================================================
           DEFAULT TAB = QUIZ
        ================================================= */

        const quizButton =
            document.querySelector(
                '.nav-btn[data-target="quizSection"]'
            );


        if (quizButton) {

            /*
               QUIZ is always the default
               when Elective is opened.
            */

            navButtons.forEach(
                function (btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            quizButton.classList.add(
                "active"
            );

        }


        /* =================================
           LOAD SAVED QUIZ
        ================================= */

        if (
            quizCards &&
            quizScroll
        ) {

            renderCards(
                getSaved(
                    QUIZ_STORAGE
                ),
                quizCards,
                quizScroll,
                QUIZ_STORAGE
            );

        }


        /* =================================
           LOAD SAVED LAB
        ================================= */

        if (
            labCards &&
            labScroll
        ) {

            renderCards(
                getSaved(
                    LAB_STORAGE
                ),
                labCards,
                labScroll,
                LAB_STORAGE
            );

        }


        /* =================================
           LOAD SAVED EXAM
        ================================= */

        renderExam(
            getSaved(
                EXAM_STORAGE
            )
        );

    }
);









/* =================================
   ELECTIVE → DEFAULT QUIZ
================================= */

const electiveLink =
    document.querySelector(
        '.navbar nav a[href="#elective"]'
    );

const quizButton =
    document.querySelector(
        '.nav-btn[data-target="quizSection"]'
    );

if (electiveLink && quizButton) {

    electiveLink.addEventListener(
        "click",
        function () {

            document
                .querySelectorAll(".nav-btn")
                .forEach(function (btn) {

                    btn.classList.remove("active");

                });

            quizButton.classList.add("active");

        }
    );

}