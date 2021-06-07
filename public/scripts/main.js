const phoneScreens = document.querySelectorAll(".phone-slider__screen");
const totalPhoneScreens = phoneScreens.length;
console.log(totalPhoneScreens);

const slideScreen = () => {
    const activeScreen = document.querySelector(".phone-slider__screen--active");
    const activeNumber = Number(activeScreen.classList.value.replace(/[^0-9]/g, ''));
    let nextNumber = activeNumber + 1;
    if (nextNumber > totalPhoneScreens) {
        nextNumber = 1;
    }
    const nextScreen = document.querySelector(`.phone-slider__screen--${nextNumber}`);
    console.log(nextScreen);
    activeScreen.classList.replace("phone-slider__screen--active", "phone-slider__screen--exit");
    nextScreen.classList.add("phone-slider__screen--active");
    setTimeout(() => {
        activeScreen.classList.remove("phone-slider__screen--exit")
    }, 750);
}

setInterval(() => {
    slideScreen();
}, 5000);