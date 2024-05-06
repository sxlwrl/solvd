const translations = {
    en: {
        greet: "Hello",
        intro: "Welcome to our website"
    },
    fr: {
        greet: "Bonjour",
        intro: "Bienvenue sur notre site web"
    }
};

const localize = (_template, ...opt) => {
    return (language) => {
        const translation = translations[language];
        return opt.map(param => translation[param])[0];
    };
};


// const language = "en";
const language = "fr";
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting}`(language);
const localizedIntroduction = localize`${introduction}`(language);

console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")
