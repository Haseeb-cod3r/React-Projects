import "./style/index.css";
import quizData from "./quizData";
import { useEffect, useRef, useState } from "react";

function App() {
  const [data, setData] = useState(quizData);
  const [counter, setCounter] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [results, setResults] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const btn = useRef([]);

  useEffect(() => {
    setIsAnswered(false);
  }, [counter]);

  useEffect(() => {
    if (isFinish) {
      const filterCorrectResult = results.filter((res) => {
        return res;
      });

      setCorrectAnswer(filterCorrectResult.length);
    }
  }, [isFinish]);

  function checkResult(i, id) {
    if (isAnswered === true) {
      return;
    }
    btn.current.forEach((btn) => {
      console.log(btn);
      btn.style.cursor = "not-allowed";
    });

    data[counter].correctAnswer === i
      ? setResults((prev) => [...prev, true])
      : setResults((prev) => [...prev, false]);

    if (data[counter].correctAnswer === i) {
      btn.current.forEach((btn, index) => {
        index === i ? (btn.style.backgroundColor = "#22C55E") : "";
      });
    } else {
      btn.current.forEach((btn, index) => {
        index === i ? (btn.style.backgroundColor = "#EF4444") : "";

        index === data[counter].correctAnswer
          ? (btn.style.backgroundColor = "#22C55E")
          : "";
      });
    }
  }

  function handleOnClick() {
    setCounter((prev) => (data.length > prev + 1 ? prev + 1 : prev));
    btn.current.forEach((btn) => {
      btn.style.backgroundColor = "white";
    });

    btn.current.forEach((btn) => {
      console.log(btn);
      btn.style.cursor = "pointer";
    });

    data.length === counter + 1 ? setIsFinish(true) : "";
  }

  function reset() {
    setCounter(0);
    setIsAnswered(false);
    setResults([]);
    setIsFinish(false);
    setCorrectAnswer(null);
    setWrongAnswer(null);
    btn.current = [];
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-xl bg-sky-400 rounded-3xl p-8 shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-gray-900">Quiz</span>{" "}
            <span className="text-yellow-300">Whiz</span>
          </h1>
          <div className="h-[1px] bg-white mt-2" />
        </div>

        {isFinish ? (
          ""
        ) : (
          <p className="text-lg font-medium text-gray-900 mb-8">
            {data[counter].id}.{data[counter].question}
          </p>
        )}

        {/* Options */}
        <div className="space-y-4 flex flex-col items-center">
          {isFinish ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Quiz Completed 🎉
              </h2>

              <div className="w-40 h-40 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                <span className="text-5xl font-bold text-green-600">
                  {correctAnswer}/{data.length}
                </span>
              </div>

              <div className="space-y-2 mb-8 text-gray-700">
                <p>
                  ✅ Correct Answers:{" "}
                  <span className="font-semibold">{correctAnswer}</span>
                </p>
                <p>
                  ❌ Wrong Answers:{" "}
                  <span className="font-semibold">
                    {data.length - correctAnswer}
                  </span>
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={reset}
                  className="flex-1 bg-white  text-sky-500 py-3 rounded-full font-medium transition"
                >
                  Restart Quiz
                </button>
              </div>
            </div>
          ) : (
            data[counter].options.map((option, index) => (
              <button
                ref={(ref) => {
                  btn.current[index] = ref;
                }}
                onClick={() => {
                  checkResult(index, data[counter].id);
                  setIsAnswered(true);
                }}
                key={index}
                className="w-full text-left bg-white px-6 py-3 rounded-full cursor-pointer font-medium text-gray-800 hover:bg-sky-100 transition"
              >
                {option}
              </button>
            ))
          )}
          {isAnswered && !isFinish ? (
            <button
              onClick={handleOnClick}
              className="text-white text-[30px] bg-amber-300 rounded-2xl px-3"
            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
