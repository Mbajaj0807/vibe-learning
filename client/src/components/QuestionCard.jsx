import { CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const QuestionCard = ({ question, onAnswer, currentQuestion, totalQuestions, statusObj }) => {
  // statusObj = { status: 'unattempted'|'correct'|'incorrect', selectedOption: null|string }
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (statusObj.status === 'unattempted') {
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setSelectedOption(statusObj.selectedOption);
      setShowResult(true);
    }
  }, [statusObj]);

  const handleOptionClick = (option) => {
    if (showResult) return; // already attempted
    setSelectedOption(option);
    setShowResult(true);

    setTimeout(() => {
      onAnswer(option === question.answer, option);
    }, 500); // short delay for animation
  };

  const getOptionClass = (option) => {
    if (!showResult)
      return 'bg-gray-900 border-2 border-blue-700 hover:border-blue-500 hover:bg-gray-800 transform hover:scale-105 shadow-lg transition-all';
    if (option === question.answer) return 'bg-green-900 border-2 border-green-500 shadow-xl';
    if (option === selectedOption && option !== question.answer) return 'bg-red-900 border-2 border-red-500 shadow-xl';
    return 'bg-gray-800 border-2 border-gray-700';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-black rounded-2xl shadow-2xl p-8 border border-blue-800">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-semibold text-blue-300 bg-blue-950 px-4 py-2 rounded-full border border-blue-700">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white leading-relaxed">{question.question}</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(question.options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleOptionClick(key)}
              disabled={showResult}
              className={`w-full p-5 rounded-xl text-left transition-all duration-300 ${getOptionClass(key)} ${
                showResult ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {key}
                </div>
                <div className="flex-1 font-medium text-white">{value}</div>
                {showResult && key === question.answer && (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                )}
                {showResult && key === selectedOption && key !== question.answer && (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
