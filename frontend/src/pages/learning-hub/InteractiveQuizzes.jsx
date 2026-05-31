import React, { useState } from 'react';
import { Award, Target, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function InteractiveQuizzes() {
  const [selectedAns, setSelectedAns] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const question = {
    text: "Which of the following is the most effective biological control agent against Whiteflies in Cotton?",
    options: [
      { id: 'A', text: "Ladybird Beetles" },
      { id: 'B', text: "Neem Oil Spray" },
      { id: 'C', text: "Chrysoperla (Green Lacewing)", correct: true },
      { id: 'D', text: "Copper Fungicide" }
    ]
  };

  const handleSelect = (id) => {
    if (!submitted) setSelectedAns(id);
  };

  const handleSubmit = () => {
    if (selectedAns) setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setSelectedAns(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      <div className="flex items-center gap-2.5 mb-8">
        <div className="p-2 bg-[#31572c]/10 rounded-lg">
          <Target className="h-6 w-6 text-[#31572c]" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-950">Interactive Quizzes</h1>
          <p className="text-sm text-gray-500">Test your agronomy knowledge and earn certifications</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Quiz Area */}
        <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Question 1 of 10</span>
            <span className="bg-[#31572c]/10 text-[#31572c] px-3 py-1 rounded-full text-xs font-bold">Pest Management Module</span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-8 leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((opt) => {
              const isSelected = selectedAns === opt.id;
              const isCorrect = opt.correct;
              
              let stateClass = "border-gray-200 hover:border-[#31572c]/50 hover:bg-gray-50 cursor-pointer";
              if (submitted) {
                if (isCorrect) stateClass = "border-emerald-500 bg-emerald-50 text-emerald-900";
                else if (isSelected && !isCorrect) stateClass = "border-red-500 bg-red-50 text-red-900";
                else stateClass = "border-gray-200 opacity-50 cursor-not-allowed";
              } else if (isSelected) {
                stateClass = "border-[#31572c] bg-[#31572c]/5 ring-2 ring-[#31572c]/20";
              }

              return (
                <div 
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${stateClass}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      submitted && isCorrect ? 'bg-emerald-500 text-white' : 
                      submitted && isSelected && !isCorrect ? 'bg-red-500 text-white' : 
                      isSelected ? 'bg-[#31572c] text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {opt.id}
                    </div>
                    <span className="font-semibold text-gray-800">{opt.text}</span>
                  </div>
                  
                  {submitted && isCorrect && <CheckCircle2 className="h-6 w-6 text-emerald-500" />}
                  {submitted && isSelected && !isCorrect && <XCircle className="h-6 w-6 text-red-500" />}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            {!submitted ? (
              <button 
                onClick={handleSubmit}
                disabled={!selectedAns}
                className="bg-[#31572c] text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:bg-[#1a3018] transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button 
                onClick={reset}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md hover:bg-black transition-colors"
              >
                Next Question <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Gamification Sidebar */}
        <div className="w-full lg:w-80 bg-gradient-to-b from-[#31572c] to-[#1a3018] rounded-3xl p-6 text-white shadow-lg h-fit">
          <div className="flex flex-col items-center text-center pb-6 border-b border-white/20">
            <div className="h-20 w-20 bg-amber-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)] mb-4">
              <Award className="h-10 w-10 text-[#31572c]" />
            </div>
            <h3 className="text-xl font-bold">Level 4 Scholar</h3>
            <p className="text-emerald-100/70 text-sm mt-1">2,450 XP points</p>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span>Daily Streak</span>
                <span className="text-amber-400">🔥 4 Days</span>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5,6,7].map(d => (
                  <div key={d} className={`h-2 flex-1 rounded-full ${d <= 4 ? 'bg-amber-400' : 'bg-white/20'}`}></div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-2xl">
              <span className="text-xs uppercase tracking-widest text-emerald-200/60 font-bold block mb-2">Next Milestone</span>
              <p className="text-sm font-bold leading-snug">Score 80%+ on this quiz to unlock the "Pest Expert" badge.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
