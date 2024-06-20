const CONFIG = {
    // Initiell størrelse på populasjonen. Denne kan endre seg basert på valgt algoritme
    // Det er viktig å ha kontroll på størrelsen, da dette har mye å si for kjøretid og populasjons-entropi
    populationSize: 200, 
    // Mutasjonsraten er sannsynligheten for at et gitt gen endrer seg. Denne bør være større enn 0, men 
    // ikke så stor at algoritmen ikke klarer å konvergere mot en løsning. For stor mutasjonsrate kan føre til
    // at algoritmen blir for tilfeldig, og ikke klarer å finne en løsning.
    mutationRate: 0.01,
    // Max antall generasjoner før algoritmen avsluttes. Dette er en sikkerhetsmekanisme for å unngå at algoritmen
    // kjører i det uendelige. Vi setter den til 1000 for konkurransen, men du kan endre den i testene dine.
    maxGenerations: 1000,
    // Dette er poolet av karakterer som algoritmen kan velge fra. Vi har valgt å kun bruke små bokstaver, store bokstaver,
    // og noen spesialtegn. Vi trenger nok ikke mer for å lage fullstendige setninger.
    chars: "abcdefghijklmnopqrstuvwxyzæøåABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ,. ",
}


export default CONFIG;