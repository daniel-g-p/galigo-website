// 1. GLOBAL JAVASCRIPT

// 1.1 DOM ELEMENTS
const headerBar = document.querySelector(".header-bar");
const headerOverlay = document.querySelector(".header-bar__overlay");
const navigationCheckbox = document.querySelector(".header-bar__navigation-checkbox");
// 1.2 EVENT LISTENERS
navigationCheckbox.addEventListener("change", () => {
    headerOverlay.classList.toggle("header-bar__overlay--active");
    headerBar.classList.toggle("header-bar--active");
});
// 1.3 FUNCTIONS
const checkIndex = (number, array) => {
    if (number > array.length) {
        number = 1;
    } else if (!number) {
        number = array.length;
    }
    return number;
}
const parseClassNumber = element => {
    return Number(element.classList.value.replace(/[^0-9]/g, ''));
}


// 2. HOME PAGE

if (document.body.classList.value === "body--home") {
    // 2.1 DOM ELEMENTS
    const phoneScreens = document.querySelectorAll(".phone-slider__screen");
    const problemButtons = document.querySelectorAll(".problem-slider__button");
    const problemDots = document.querySelectorAll(".problem-slider__dot");
    const problemText = document.querySelector(".problems-section__text");
    const problemTitle = document.querySelector(".problems-section__title");
    const problemDescription = document.querySelector(".problems-section__description");
    const solutionInputs = document.querySelectorAll(".solution-illustration__input");
    const solutionButtons = document.querySelectorAll(".solution-illustration__icon--service");
    const solutionText = document.querySelector(".solutions-section__text");
    const solutionTitle = document.querySelector(".solutions-section__title");
    const solutionDescription = document.querySelector(".solutions-section__description");
    const newsletterForm = document.querySelector(".contact-section__form");
    const newsletterName = document.querySelector(".contact-section__input--name");
    const newsletterEmail = document.querySelector(".contact-section__input--email");
    const newsLetterError = document.querySelector(".contact-section__error");
    // 2.2 CONTENT ARRAYS
    const problemsContent = [{
            title: "Slow Traffic Updates",
            text: "One of the main causes for traffic congestion is poor anticipation, which is why we must foster ways to identify and communicate it faster."
        },
        {
            title: "Road Anomalies",
            text: "Roadworks, accidents, and deviations may sometimes be inevitable, but we can strive to manage them with more reactive, efficient, and secure methods."
        },
        {
            title: "Traffic Congestion",
            text: "To this day, traffic congestion causes major issues related to mental health, time efficiency, and economic productivity."
        },
        {
            title: "Unreliable Public Transport",
            text: "Many of us are dependent on public transport, and its service quality and timeliness still leave a lot to be desired."
        },
        {
            title: "Inefficient Delivery",
            text: "In today's digital economy, we need to find better and faster ways to get online orders from store to door."
        },
        {
            title: "Excess Fuel Consumption",
            text: "There are only so many natural resources available to us, and we are racing towards a depletion of our raw materials."
        },
        {
            title: "Increased Pollution",
            text: "Our planet is the most valuable thing we have, yet we don't treat it as such judging by our greenhouse gas emissions."
        },
    ];
    const solutionsContent = [{
            title: "Road Anomaly Detection",
            text: "GaliGo automatically detects and locates road anomalies such as holes in the road, accidents, and roadworks."
        },
        {
            title: "Traffic Signal Analysis",
            text: "GaliGo uses its AI-powered technology to identify miscoordination between traffic signals in urban communities."
        },
        {
            title: "Smart Itinerary Planning",
            text: "GaliGo takes a whole new approach to proposing the best and most efficient itineraries to road users."
        },
        {
            title: "Real-time Traffic Updates",
            text: "GaliGo can't promise to eliminate accidents and other inconveniences entirely, but it sure can identify and communicate them faster than ever before."
        },
        {
            title: "Public Transport Tracking",
            text: "GaliGo's technology allows citizens to locate their next bus at all times and with unprecedented precision."
        },
        {
            title: "Delivery Tracking",
            text: "With GaliGo, the days of missing deliveries due to unpunctual carriers or impractical schedules are over."
        }
    ];
    // 2.3 EVENT LISTENERS
    problemButtons.forEach(b => {
        b.addEventListener("click", () => {
            problemButtons.forEach(b => b.classList.add("unclickable"));
            clearInterval(problemsAuto);
            const activeProblem = document.querySelector(".problem-slider__image--active");
            const activeNumber = parseClassNumber(activeProblem);
            let nextNumber = activeNumber + 1;
            if (b.classList.contains("problem-slider__button--left")) {
                nextNumber = activeNumber - 1;
            }
            nextNumber = checkIndex(nextNumber, problemsContent);
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
                const activeNumber = parseClassNumber(d);
                changeProblem(activeProblem, activeNumber);
            }
        });
    });
    solutionInputs.forEach(input => {
        input.addEventListener("change", () => {
            const activeSolution = document.querySelector(".solution-illustration__input:checked");
            const number = Number(input.value);
            changeSolution(number);
        });
    });
    solutionButtons.forEach(button => {
        button.addEventListener("click", () => {
            clearInterval(solutionsAuto);
        });
    });
    newsletterForm.addEventListener("submit", (e) => {
        const isValid = validateNewsletterForm();
        if (!isValid) {
            e.preventDefault();
        }
    });
    [newsletterName, newsletterEmail].forEach(input => {
        input.addEventListener("input", () => {
            input.classList.remove("contact-section__input--error");
        });
    });
    // 2.4 AUTOMATIC INTERVALS
    const screensAuto = setInterval(() => {
        slideScreen();
    }, 5000);
    const problemsAuto = setInterval(() => {
        const activeProblem = document.querySelector(".problem-slider__image--active");
        const activeNumber = Number(activeProblem.classList.value.replace(/[^0-9]/g, ''));
        let nextNumber = activeNumber + 1;
        nextNumber = checkIndex(nextNumber, problemsContent);
        changeProblem(activeProblem, nextNumber);
    }, 7500);
    const solutionsAuto = setInterval(() => {
        const activeSolution = document.querySelector(".solution-illustration__input:checked");
        const number = Number(activeSolution.value);
        let nextNumber = number + 1;
        nextNumber = checkIndex(nextNumber, solutionsContent);
        const nextSolution = document.querySelector(`#service${nextNumber}`);
        activeSolution.checked = false;
        nextSolution.checked = true;
        changeSolution(nextNumber);
    }, 7500);
    // 2.5 FUNCTIONS
    const slideScreen = () => {
        const activeScreen = document.querySelector(".phone-slider__screen--active");
        const activeNumber = Number(activeScreen.classList.value.replace(/[^0-9]/g, ''));
        const totalPhoneScreens = phoneScreens.length;
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
        // const oldDescriptionHeight = problemDescription.scrollHeight;
        // const oldTitleHeight = problemTitle.scrollHeight;
        setTimeout(() => {
            problemTitle.innerHTML = problemsContent[number - 1].title;
            problemDescription.innerHTML = problemsContent[number - 1].text;
            const newDescriptionHeight = problemDescription.scrollHeight;
            const newTitleHeight = problemTitle.scrollHeight;
            const newHeight = newTitleHeight + newDescriptionHeight;
            problemText.style.height = newHeight + "px";
            problemText.style.opacity = 1;
        }, 500);
    };
    const changeSolution = number => {
        const oldHeight = solutionText.scrollHeight;
        solutionText.style.height = oldHeight + "px";
        solutionText.style.opacity = 0;
        setTimeout(() => {
            solutionTitle.innerHTML = solutionsContent[number - 1].title;
            solutionDescription.innerHTML = solutionsContent[number - 1].text;
            const newDescriptionHeight = solutionDescription.scrollHeight;
            const newTitleHeight = solutionTitle.scrollHeight;
            const newHeight = newTitleHeight + newDescriptionHeight;
            solutionText.style.height = newHeight + "px";
            solutionText.style.opacity = 1;
        }, 500);
    };
    const validateNewsletterForm = () => {
        if (newsletterName.value === "") {
            newsletterName.classList.add("contact-section__input--error");
        }
        if (newsletterEmail.value === "" || !newsletterEmail.value.match(/\S+@\S+\.\S+/)) {
            newsletterEmail.classList.add("contact-section__input--error");
        }
        if (newsletterName.value === "" || newsletterEmail.value === "" || !newsletterEmail.value.match(/\S+@\S+\.\S+/)) {
            return false;
        } else {
            return true;
        };
    };
};


// 3. ABOUT PAGE
if (document.body.classList.value === "body--about") {
    // 3.1 DOM ELEMENTS
    const teamCategories = document.querySelectorAll(".team-slider__input");
    const teamMembers = document.querySelectorAll(".team-slider__person");
    // 3.2 EVENT LISTENERS
    teamCategories.forEach(c => c.addEventListener("change", () => {
        const category = c.value;
        changeTeam(category);
    }));
    // 3.3 FUNCTIONS
    const changeTeam = (category) => {
        const active = document.querySelectorAll(".team-slider__person--active");
        const nextMembers = () => {
            if (category === "all") {
                return teamMembers;
            } else {
                return document.querySelectorAll(`.team-slider__person--${category}`);
            }
        }
        const next = nextMembers();
        document.querySelectorAll(`.team-slider__person--${category}`);
        for (let person of active) {
            person.classList.replace("team-slider__person--active", "team-slider__person--previous");
            setTimeout(() => {
                person.classList.add("team-slider__person--active", "team-slider__person--hidden");
            }, 250);
        }
        setTimeout(() => {
            for (let person of next) {
                person.classList.remove("team-slider__person--previous", "team-slider__person--hidden");
                person.classList.add("team-slider__person--next");
                setTimeout(() => {
                    person.classList.replace("team-slider__person--next", "team-slider__person--active");
                }, 250);
            }
        }, 250);
    }
};


// 4. TECHNOLOGY PAGE

if (document.body.classList.value === "body--technology") {
    // 4.1 DOM ELEMENTS
    const receiverToggles = document.querySelectorAll(".ehermes__input");
    const receiverComponents = document.querySelectorAll(".receiver__component");
    const applicationInputs = document.querySelectorAll(".app__input");
    const applicationContent = document.querySelectorAll(".application-section__text");
    // 4.2 EVENT LISTENERS
    receiverToggles.forEach(t => t.addEventListener("change", () => {
        const label = t.value;
        const activeComponent = document.querySelector(".receiver__component--active");
        const nextComponent = document.querySelector(`.receiver__component--${label}`);
        activeComponent.classList.replace("receiver__component--active", "receiver__component--exit");
        nextComponent.classList.add("receiver__component--enter");
        setTimeout(() => {
            activeComponent.classList.remove("receiver__component--exit");
            nextComponent.classList.replace("receiver__component--enter", "receiver__component--active");
        }, 250);
    }));
    applicationInputs.forEach(i => i.addEventListener("change", () => {
        const label = i.id;
        const nextComponent = changeText("application-section__text", label);
        setTimeout(() => {
            nextComponent.scrollIntoView({ behavior: "smooth" });
        }, 250);
    }));
    // 4.3 FUNCTIONS
    const changeText = (className, id) => {
        const activeComponent = document.querySelector(`.${className}--active`);
        const nextComponent = document.querySelector(`.${className}--${id}`);
        activeComponent.classList.replace(`${className}--active`, `${className}--exit`);
        nextComponent.classList.add(`${className}--enter`);
        setTimeout(() => {
            activeComponent.classList.remove(`${className}--exit`);
            nextComponent.classList.replace(`${className}--enter`, `${className}--active`);
        }, 250);
        console.log(nextComponent);
        return nextComponent;
    }
}


// 5. CONTACT PAGE 
if (document.body.classList.value === "body--contact") {
    // 5.1 DOM ELEMENTS
    const questionInputs = document.querySelectorAll(".faqs__input");
    const contactForm = document.querySelector(".contact-form");
    const contactFormName = document.querySelector("#name");
    const contactFormEmail = document.querySelector("#email");
    const contactFormSubject = document.querySelector("#subject");
    const contactFormMessage = document.querySelector("#message");
    const contactInputs = [contactFormName, contactFormEmail, contactFormSubject, contactFormMessage];
    console.log(contactInputs);
    // 5.2 EVENT LISTENERS
    questionInputs.forEach(i => i.addEventListener("change", () => {
        const answer = document.querySelector(`.faqs__answer--${i.id}`);
        if (i.checked) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = 0;
        }
    }));
    contactForm.addEventListener("submit", (e) => {
        const isValid = validateContactForm();
        if (!isValid) {
            e.preventDefault();
        }
    });
    contactInputs.forEach(i => i.addEventListener("input", () => {
            i.classList.remove("contact-form__input--error");
        }))
        // 5.3 FUNCTIONS
    const validateContactForm = () => {
        contactInputs.forEach(i => {
            if (i.value === "") {
                i.classList.add("contact-form__input--error");
            }
        });
        if (!contactFormEmail.value.match(/\S+@\S+\.\S+/)) {
            contactFormEmail.classList.add("contact-form__input--error");
        }
        if (contactInputs.some(i => i.classList.contains("contact-form__input--error"))) {
            return false;
        } else {
            return true;
        }
    }
}