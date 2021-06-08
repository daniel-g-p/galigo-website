const phoneScreens = document.querySelectorAll(".phone-slider__screen");
const totalPhoneScreens = phoneScreens.length;

const slideScreen = () => {
    const activeScreen = document.querySelector(".phone-slider__screen--active");
    const activeNumber = Number(activeScreen.classList.value.replace(/[^0-9]/g, ''));
    let nextNumber = activeNumber + 1;
    if (nextNumber > totalPhoneScreens) {
        nextNumber = 1;
    }
    const nextScreen = document.querySelector(`.phone-slider__screen--${nextNumber}`);
    activeScreen.classList.replace("phone-slider__screen--active", "phone-slider__screen--exit");
    nextScreen.classList.add("phone-slider__screen--active");
    setTimeout(() => {
        activeScreen.classList.remove("phone-slider__screen--exit")
    }, 750);
}

setInterval(() => {
    slideScreen();
}, 5000);

const problemsContent = [{
        title: "Slow Traffic Updates",
        text: "One of the main causes for traffic congestion is poor anticipation. As it stands today, by the time traffic congestion is detected and communicated to road users, the situation has more often than not already aggravated."
    },
    {
        title: "Undetected Road Anomalies",
        text: "Roadworks, accidents, and deviations happen to be a part of urban mobility. And while they may sometimes be inevitable, we should certainly strive to manage them with more reactive, efficient, and secure methods."
    },
    {
        title: "Traffic Congestion",
        text: "We've all been stuck in a line of cars that stretches into the horizon at some point. To this day, traffic congestion causes major issues related to mental health, time efficiency, and economic productivity."
    },
    {
        title: "Unreliable Public Transport",
        text: "One of the greatest assets of urban cities is ironically also a major source of frustration. Many of us are dependent on public transport, and its service quality and timeliness still leave a lot to be desired."
    },
    {
        title: "Inefficient Delivery Services",
        text: "In an economy where virtually everything can be purchased through a screen, we need to find a better way to get online orders from store to door, for the benefit of consumers, sellers, and carriers alike."
    },
    {
        title: "Excess Fuel Consumption",
        text: "There are only so many natural resources available to us, and we are racing towards a depletion of our raw materials. Urban traffic in particular can't sustain its current fuel consumption for much longer."
    },
    {
        title: "Increased Pollution",
        text: "Our planet is the most valuable thing we have, yet we don't treat it as such. In urban cities more than anywhere else, it's about time that we start making a real effort to reduce our greenhouse gas emissions."
    },
];

const problemButtons = document.querySelectorAll(".problem-slider__button");
const problemDots = document.querySelectorAll(".problem-slider__dot");
const problemText = document.querySelector(".problems-section__text");
const problemTitle = document.querySelector(".problems-section__title");
const problemDescription = document.querySelector(".problems-section__description");

problemButtons.forEach(b => {
    b.addEventListener("click", () => {
        problemButtons.forEach(b => b.classList.add("unclickable"));
        clearInterval(problemsAuto);
        const activeProblem = document.querySelector(".problem-slider__image--active");
        const activeNumber = Number(activeProblem.classList.value.replace(/[^0-9]/g, ''));
        let nextNumber = activeNumber + 1;
        if (b.classList.contains("problem-slider__button--left")) {
            nextNumber = activeNumber - 1;
        }
        nextNumber = checkProblemNumber(nextNumber);
        changeProblem(activeProblem, nextNumber);
        setTimeout(() => {
            problemButtons.forEach(b => b.classList.remove("unclickable"));
        }, 1000);
    });
});

problemDots.forEach(d => {
    d.addEventListener("click", () => {
        clearInterval(problemsAuto);
        if (d.classList.contains("problem-slider__dot--active")) {
            return
        } else {
            const activeProblem = document.querySelector(".problem-slider__image--active");
            const activeNumber = Number(d.classList.value.replace(/[^0-9]/g, ''));
            changeProblem(activeProblem, activeNumber);
        }

    });
})

const changeProblem = (image, number) => {
    const activeDot = document.querySelector(".problem-slider__dot--active");
    const nextDot = document.querySelector(`.problem-slider__dot--${number}`);
    const nextProblem = document.querySelector(`.problem-slider__image--${number}`);
    activeDot.classList.remove("problem-slider__dot--active");
    nextDot.classList.add("problem-slider__dot--active");
    image.classList.remove("problem-slider__image--active");
    nextProblem.classList.add("problem-slider__image--active");
    const oldHeight = problemText.scrollHeight;
    problemText.style.height = oldHeight + "px";
    problemText.style.opacity = 0;
    const oldDescriptionHeight = problemDescription.scrollHeight;
    const oldTitleHeight = problemTitle.scrollHeight;
    setTimeout(() => {
        problemTitle.innerHTML = problemsContent[number - 1].title;
        problemDescription.innerHTML = problemsContent[number - 1].text;
        const newDescriptionHeight = problemDescription.scrollHeight;
        const newTitleHeight = problemTitle.scrollHeight;
        const heightDifference = newTitleHeight - oldTitleHeight + newDescriptionHeight - oldDescriptionHeight;
        problemText.style.height = problemText.scrollHeight + heightDifference + "px";
        problemText.style.opacity = 1;
    }, 500);

};

const checkProblemNumber = number => {
    if (number > problemsContent.length) {
        number = 1;
    } else if (!number) {
        number = problemsContent.length;
    }
    return number;
}

const problemsAuto = setInterval(() => {
    const activeProblem = document.querySelector(".problem-slider__image--active");
    const activeNumber = Number(activeProblem.classList.value.replace(/[^0-9]/g, ''));
    let nextNumber = activeNumber + 1;
    nextNumber = checkProblemNumber(nextNumber);
    changeProblem(activeProblem, nextNumber);
}, 7500);