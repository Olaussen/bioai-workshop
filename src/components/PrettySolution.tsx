import React from "react";
import { Individual } from "../geneticalg/GeneticAlgorithm";

interface PrettySolutionProps {
  solution: string;
  allTimeBest: Individual | undefined;
}

const PrettySolution: React.FC<PrettySolutionProps> = ({
  solution,
  allTimeBest,
}) => {
  if (!allTimeBest)
    return (
      <div className="w-full flex flex-col items-center">
        <p className="text-2xl">La oss finne:</p>
        <p className="font-bold text-5xl text-center">{solution}</p>
      </div>
    );

  let correctCount = 0;

  const { genotype, fitness } = allTimeBest;

  const renderedGenotype = genotype.split("").map((char, index) => {
    let style = "text-red-500 opacity-80"; // Default: Incorrect (red)
    if (char === solution[index]) {
      style = "text-green-500 opacity-80"; // Correct position (green)
      correctCount++;
    } else if (solution.includes(char)) {
      style = "text-orange-500 opacity-80"; // Correct character but wrong position (orange)
    }

    return (
      <span key={index} className={`font-bold ${style} mx-1 text-5xl w-[2rem]`}>
        {char}
      </span>
    );
  });

  return (
    <div className="p-7 border border-gray-300 rounded-lg shadow font-mono">
      <p className="text-center text-sm">Vi leter etter:</p>
      <p className="text-center">{solution}</p>
      <div className="mb-2 flex justify-center space-x-1 p-5 max-w-full flex-wrap">
        {renderedGenotype}
      </div>
      <div className="text-sm text-slate-200 pl-5 flex justify-center">
        Fitness: {fitness.toFixed(4)} | Riktig plass: {correctCount} /{" "}
        {solution.length}
      </div>
    </div>
  );
};

export default PrettySolution;
