import CONFIG from "./config";

export interface Individual {
  genotype: string;
  fitness: number;
}

/**
 * Vi skal prøve å lage den beste genetiske algoritmen for å finne en gitt streng.
 * Under er en enkel implementasjon av en genetisk algoritme, men den mangler en del funksjonalitet.
 * Din oppgave er å implementere de manglende funksjonene, OG å endre på de eksisterende funksjonene for å forbedre algoritmen.
 * Algoritmen vil kjøre som den er, men den vil antagelig ikke finne målstrengen.
 */
export default class GeneticAlgorithm {
  private target: string;
  private populationSize: number;
  private mutationRate: number;
  private population: Individual[];
  public isRunning: boolean = false;
  public isFinished: boolean = false;

  constructor(target: string) {
    this.target = target;
    this.populationSize = CONFIG.populationSize;
    this.mutationRate = CONFIG.mutationRate;
    this.population = this.initializePopulation();
  }

  /**
   * Hjelpemetode for å generere en tilfeldig karakter fra CONFIG.chars
   * @returns En tilfeldig karakter fra CONFIG.chars
   */
  private randomChar(): string {
    const chars = CONFIG.chars;
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  /**
   * Hjelpemetode for å generere en tilfeldig streng av lengde this.target.length
   * @returns En tilfeldig streng av lengde this.target.length
   */
  private randomString(): string {
    return Array.from({ length: this.target.length }, this.randomChar).join("");
  }

  /**
   * Hjelpemetode for å beregne fitness til en gitt genotype.
   * Fitness er en verdi mellom 0 og 1 som indikerer hvor lik genotypen er målstrengen.
   * @param genotype Genotypen som skal beregnes fitness for
   * @returns En verdi mellom 0 og 1 som indikerer hvor lik genotypen er målstrengen
   */
  private calculateFitness(genotype: string): number {
    // TODO: Implement fitness function
    return 1;
  }

  /**
   * Hjelpemetode for å initialisere populasjonen. Vi må alltid ha en initiell populasjon for å starte algoritmen.
   * Denne pleier ikke være så god, men det finnes flere måter å initialisere populasjonen på.
   * Det viktiste er å ha en populasjon som er stor nok, med inidivider som har ulike egenskaper.
   * På denne måten er det større sjanse for at algoritmen finner en løsning til slutt.
   * @returns En populasjon av tilfeldige individer (dette kan endres på for å forbedre algoritmen)
   */
  private initializePopulation(): Individual[] {
    // TODO: Implement a better initial population?
    return Array.from({ length: this.populationSize }, () => {
      const genotype = this.randomString();
      return { genotype, fitness: this.calculateFitness(genotype) };
    });
  }

  /**
   * Det finnes mange måter å velge ut foreldre på. Implementasjonen under er svært svak, da alle individer har 
   * lik sjanse for formering. Seleksjonsmetoden bør være slik at de beste individene har større mulighet for å formere seg.
   * Her har vi mange muligheter. Lykke til!
   * @returns Et individ som blir valgt ut for å føre sine gener videre
   */
  private selectParent(): Individual {
    // TODO: Implement selection algorithm
    return this.population[Math.floor(Math.random() * this.population.length)];
  }

  /**
   * Crossover funkjsonen vil kombinere genene til to eller flere (to i dette tilfellet) individer.
   * Dette er en viktig del av genetiske algoritmer, og det er her vi får ny genetisk variasjon.
   * Det finnes mange måter å gjøre dette på, og det er opp til deg å finne den beste måten.
   * Under er en enkel implementasjon av en crossover funksjon som tar en tilfeldig pivot og kombinerer genene til foreldrene.
   * Dette vil si at vi finner en index hvor vi deler genene til foreldrene, og setter sammen delene til et nytt individ.
   * Eksempel:
   * Forelder 1: ABCDEFGH
   * Forelder 2: 12345678
   * Pivot: 3
   * Nytt individ: ABCD5678 (de 4 første genene fra forelder 1, og de 4 siste fra forelder 2)
   * @param parent1 Første forelder
   * @param parent2 Andre forelder
   * @returns Et nytt individ som er en kombinasjon av foreldrene
   */
  private crossover(parent1: Individual, parent2: Individual): Individual {
    // TODO: Implement crossover algorithm
    const pivot = Math.floor(Math.random() * parent1.genotype.length);
    const genotype =
      parent1.genotype.slice(0, pivot) + parent2.genotype.slice(pivot);
    return { genotype, fitness: this.calculateFitness(genotype) };
  }

  /**
   * Mutasjon er en viktig del av enhver genetisk algoritme. Dette er hvor vi får ny genetisk variasjon.
   * Mutasjon er en tilfeldig endring i genotypen til et individ. Dette kan være en endring av en enkelt karakter, eller flere.
   * Måten vi gjør mutasjon på nedenfor er bare en enkel endring av en karakter til en tilfeldig karakter med en viss sannsynlighet.
   * Det finnes igjen mange måter å gjøre dette på, og det er opp til deg å finne den beste måten.
   * @param individual Et nytt individ i populasjonen
   * @returns Det samme individet, men med en sjans for endret genotype
   */
  private mutate(individual: Individual): Individual {
    let genotype = individual.genotype
      .split("")
      .map((char) => {
        return Math.random() < this.mutationRate ? this.randomChar() : char;
      })
      .join("");

    return { genotype, fitness: this.calculateFitness(genotype) };
  }

  /**
   * Denne metoden kjører en generasjon av genetisk algoritme.
   * Den returnerer de 10 beste individene i populasjonen for visning på nettsiden.
   * @returns De 10 beste individene i populasjonen
   */
  public runGeneration(): Individual[] {
    this.isRunning = true;
    this.isFinished = false;
    this.population = this.population.map(() => {
      const parent1 = this.selectParent();
      const parent2 = this.selectParent();
      let offspring = this.crossover(parent1, parent2);
      offspring = this.mutate(offspring);
      return offspring;
    });

    const sorted = this.population.sort((a, b) => b.fitness - a.fitness);

    if (sorted[0].fitness === 1) {
      console.log("Target string found!");
    }

    return sorted.slice(0, 10);
  }

  /**
   * Denne metoden stopper algoritmen.
   */
  public stop(): void {
    this.isRunning = false;
    this.isFinished = true;
  }
}
