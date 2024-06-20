import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import PrettySolution from "./components/PrettySolution";
import GeneticAlgorithm, { Individual } from "./geneticalg/GeneticAlgorithm";
import CONFIG from "./geneticalg/config";

interface GenerationState {
  generation: number;
  allTimeBest: Individual | undefined;
  top10: Individual[];
}

const DEFAULT: GenerationState = {
  generation: 0,
  allTimeBest: undefined,
  top10: [],
};

function App() {
  // Input states
  const [input, setInput] = useState<string>("");
  const [isValidInput, setIsValidInput] = useState<boolean>(false);

  // Algorithm states
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [generationState, setGenerationState] =
    useState<GenerationState>(DEFAULT);
  const [algorithm, setAlgorithm] = useState<GeneticAlgorithm>();
  const [correctSolution, setCorrectSolution] = useState<boolean>(false);

  const handleInputChange = (value: string, valid: boolean) => {
    setInput(value);
    setIsValidInput(valid);
  };

  const handleInitialize = () => {
    if (!input) return;
    setAlgorithm(new GeneticAlgorithm(input));
    setGenerationState(DEFAULT);
    setIsInitialized(true);
  };

  const findNewBest = (candidate: Individual) => {
    return candidate.fitness > (generationState.allTimeBest?.fitness ?? 0)
      ? candidate
      : generationState.allTimeBest;
  };

  const runAlgorithm = async () => {
    if (!algorithm) return;
    let generation = 0;
    while (generation < CONFIG.maxGenerations) {
      generation++;
      const top10 = algorithm.runGeneration();
      const newBest = findNewBest(top10[0]);
      setGenerationState({
        generation,
        top10,
        allTimeBest: newBest,
      });

      if (generation === CONFIG.maxGenerations) {
        setCorrectSolution(false);
        algorithm.stop();
      }

      if (newBest?.genotype === input) {
        setCorrectSolution(true);
        algorithm.stop();
      }
      await sleep(25); // HASTIGHET PÅ REFRESH! Ikke alltid korrekt
      if (!algorithm.isRunning) break;
    }
  };

  const stopAlgorithm = () => {
    algorithm?.stop();
    setCorrectSolution(false);
    setInput("");
  };

  const reset = () => {
    setCorrectSolution(false);
    setGenerationState(DEFAULT);
    setAlgorithm(undefined);
    setIsInitialized(false);
    setInput("");
    setIsValidInput(false);
  };

  const { generation, allTimeBest, top10 } = generationState;

  return (
    <div
      className={`w-full h-full flex flex-col items-center bg-slate-700 text-slate-200 p-10`}
    >
      <div className="w-5/6 flex flex-col items-center h-full">
        {!!generation && (
          <p className="text-2xl mb-10">
            Generasjon nr. {generation} / {CONFIG.maxGenerations}
          </p>
        )}
        <div
          className={
            correctSolution
              ? "bg-green-950"
              : algorithm?.isFinished
              ? "bg-red-950"
              : "bg-slate-700"
          }
        >
          {!isInitialized ? (
            <p className="text-5xl mb-10 text-center">
              {allTimeBest?.genotype ?? "Skriv inn din løsning!"}
            </p>
          ) : (
            <PrettySolution solution={input} allTimeBest={allTimeBest} />
          )}
        </div>

        {algorithm?.isFinished && (
          <p
            className={`text-2xl mt-2 font-bold ${
              !correctSolution ? "text-red-400" : "text-green-300"
            }`}
          >
            {!correctSolution
              ? "Algoritmen fant ikke løsningen  :("
              : "YES! Vi klarte det!!!"}
          </p>
        )}

        {!algorithm && <Input onChange={handleInputChange} initialize={handleInitialize} isInitialized={isInitialized} isValidInput={isValidInput} />}

        {isInitialized && !algorithm?.isFinished && algorithm?.isRunning && (
          <Button onClick={stopAlgorithm} className="bg-red-400">
            Stopp!
          </Button>
        )}

        {isInitialized && algorithm?.isFinished && (
          <Button onClick={reset} className="bg-slate-500">
            Prøv en gang til!
          </Button>
        )}

        {isInitialized && !algorithm?.isRunning && !algorithm?.isFinished && (
          <Button onClick={runAlgorithm} className="bg-slate-500">
            Kjør genetisk algoritme!
          </Button>
        )}

        {!!generation && (
          <>
            <p className="mt-10 text-lg mb-4">Topp 10 i nåværende populasjon</p>
            <ul>
              {top10.map((individual, i) => (
                <li
                  key={i}
                  className="font-mono text-lg mb-5 border border-white p-4 opacity-60 rounded-lg w-[70rem]"
                >
                  <span>{i + 1}) </span>
                  <p className="text-wrap max-w-[60rem] break-all">Value:<br/> {individual.genotype}</p>
                  <p className="text-sm">
                    Fitness: {individual.fitness.toFixed(4)}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default App;
