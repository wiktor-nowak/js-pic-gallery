const THUMBNAILS = document.querySelectorAll(".thumbnail img");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup__close");
const POPUP_IMG = document.querySelector(".popup__img");
const ARROW_LEFT = document.querySelector(".popup__arrow--left");
const ARROW_RIGHT = document.querySelector(".popup__arrow--right");

const showPreviousImg = () => {
    if (currentImgIndex === 0) {
        currentImgIndex = THUMBNAILS.length-1;
    } else {
        currentImgIndex--;
    }
    POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
}

const showNextImg = () => {
    if (currentImgIndex === THUMBNAILS.length - 1) {
        currentImgIndex = 0;
    } else {
        currentImgIndex++;
    }
    POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
}

const popupClose = () => {
    POPUP.classList.add('fade-out');
    setTimeout(() => {
        POPUP.classList.add('hidden');
        POPUP.classList.remove('fade-out');
        THUMBNAILS.forEach(element => {
            element.setAttribute("tabindex", 1);
        });
    }, 600);
}

let currentImgIndex;


THUMBNAILS.forEach((thumbnail, index) => {
    const showPopup = (e) => {
        POPUP.classList.remove("hidden");
        POPUP_IMG.src = e.target.src;
        currentImgIndex = index;
        THUMBNAILS.forEach(element => {
            element.setAttribute("tabindex", -1);
        });
    };
    
    thumbnail.addEventListener("click", showPopup);

    thumbnail.addEventListener('keydown', (e) => { if (e.code === 'Enter') {
        showPopup(e)
    }
    });
});

POPUP_CLOSE.addEventListener('click', popupClose)

ARROW_RIGHT.addEventListener("click", showNextImg)

ARROW_LEFT.addEventListener("click", showPreviousImg)

document.addEventListener("keydown", (e) => {
    if (!POPUP.classList.contains("hidden")) {
        if (e.code === "ArrowRight") {
            showNextImg();
        }
        if (e.code === "ArrowLeft") {
            showPreviousImg();
        }
        if (e.code === "Escape") {
            popupClose();
        }
    }
})

POPUP.addEventListener('click', (e) => {
    if (e.target === POPUP) {
        popupClose();
    }
});