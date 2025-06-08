'use client';

import React, { useState } from 'react';
import { ChevronRight, RotateCcw, User, Heart, Target, Zap } from 'lucide-react';

const SelfAnalysisApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 'social',
      question: '新しい環境で人と関わるとき、どちらが当てはまりますか？',
      options: [
        { value: 'extrovert', label: '積極的に話しかけて関係を築く', weight: 2 },
        { value: 'ambivert', label: 'まずは様子を見てから関わる', weight: 1 },
        { value: 'introvert', label: '必要最小限の関わりにとどめる', weight: 0 }
      ]
    },
    {
      id: 'decision',
      question: '重要な決断をするとき、何を重視しますか？',
      options: [
        { value: 'logic', label: 'データと論理的な分析', weight: 2 },
        { value: 'balance', label: '論理と感情のバランス', weight: 1 },
        { value: 'intuition', label: '直感と感情', weight: 0 }
      ]
    },
    {
      id: 'work_style',
      question: '仕事やプロジェクトに取り組むとき、どのスタイルが好きですか？',
      options: [
        { value: 'planned', label: '計画を立てて段階的に進める', weight: 2 },
        { value: 'flexible', label: '大まかな方向性を決めて柔軟に対応', weight: 1 },
        { value: 'spontaneous', label: 'その場の状況に応じて自由に進める', weight: 0 }
      ]
    },
    {
      id: 'motivation',
      question: 'あなたを最も動機づけるものは何ですか？',
      options: [
        { value: 'achievement', label: '目標達成と成果', weight: 2 },
        { value: 'growth', label: '学習と成長', weight: 1 },
        { value: 'harmony', label: '人間関係と調和', weight: 0 }
      ]
    },
    {
      id: 'stress',
      question: 'ストレスを感じたとき、どのように対処しますか？',
      options: [
        { value: 'action', label: '問題解決のために行動する', weight: 2 },
        { value: 'reflect', label: '一人で考えて整理する', weight: 1 },
        { value: 'social', label: '人と話して気持ちを共有する', weight: 0 }
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetApp = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const calculatePersonality = () => {
    const scores = {
      extroversion: 0,
      analytical: 0,
      structured: 0,
      achievement: 0,
      proactive: 0
    };

    // 外向性スコア
    if (answers.social?.value === 'extrovert') scores.extroversion += 2;
    else if (answers.social?.value === 'ambivert') scores.extroversion += 1;

    // 分析的思考スコア
    if (answers.decision?.value === 'logic') scores.analytical += 2;
    else if (answers.decision?.value === 'balance') scores.analytical += 1;

    // 構造化スコア
    if (answers.work_style?.value === 'planned') scores.structured += 2;
    else if (answers.work_style?.value === 'flexible') scores.structured += 1;

    // 達成志向スコア
    if (answers.motivation?.value === 'achievement') scores.achievement += 2;
    else if (answers.motivation?.value === 'growth') scores.achievement += 1;

    // 積極性スコア
    if (answers.stress?.value === 'action') scores.proactive += 2;
    else if (answers.stress?.value === 'reflect') scores.proactive += 1;

    return scores;
  };

  const getPersonalityType = () => {
    const scores = calculatePersonality();
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    if (total >= 8) {
      return {
        type: 'リーダータイプ',
        icon: <Target className="w-8 h-8 text-red-500" />,
        description: 'あなたは目標志向で積極的なリーダータイプです。計画的に物事を進め、チームを引っ張っていく力があります。',
        strengths: ['決断力', '計画性', 'リーダーシップ', '目標達成力'],
        advice: '時には他者の意見に耳を傾け、柔軟性を持つことで、さらに効果的なリーダーになれるでしょう。'
      };
    } else if (total >= 5) {
      return {
        type: 'バランスタイプ',
        icon: <Heart className="w-8 h-8 text-blue-500" />,
        description: 'あなたは論理と感情のバランスが取れた調和型タイプです。状況に応じて柔軟に対応できます。',
        strengths: ['適応力', 'バランス感覚', 'コミュニケーション力', '協調性'],
        advice: '自分の強みを活かしながら、特定の分野で専門性を深めることで更なる成長が期待できます。'
      };
    } else {
      return {
        type: 'クリエイティブタイプ',
        icon: <Zap className="w-8 h-8 text-purple-500" />,
        description: 'あなたは直感的で創造性豊かなタイプです。自由な発想で新しいアイデアを生み出すことが得意です。',
        strengths: ['創造性', '直感力', '自由な発想', '感受性'],
        advice: 'アイデアを形にするための計画性や継続力を身につけることで、創造性をより効果的に活用できるでしょう。'
      };
    }
  };

  if (showResult) {
    const personality = getPersonalityType();
    const scores = calculatePersonality();

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">自己分析結果</h1>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            {personality.icon}
          </div>
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">{personality.type}</h2>
          <p className="text-gray-700 text-center mb-6 leading-relaxed">{personality.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">あなたの強み</h3>
              <ul className="space-y-1">
                {personality.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">成長のヒント</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{personality.advice}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">詳細スコア</h3>
          <div className="space-y-3">
            {Object.entries(scores).map(([key, score]) => {
              const labels = {
                extroversion: '外向性',
                analytical: '分析的思考',
                structured: '構造化',
                achievement: '達成志向',
                proactive: '積極性'
              };
              return (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{labels[key]}</span>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${(score / 2) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{score}/2</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={resetApp}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          もう一度診断する
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">自己分析アプリ</h1>
        <p className="text-gray-600">5つの質問であなたの性格を分析します</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">質問 {currentQuestion + 1} / {questions.length}</span>
          <span className="text-sm text-gray-500">{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`block p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedAnswer?.value === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={selectedAnswer?.value === option.value}
                onChange={() => handleAnswer(question.id, option)}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  selectedAnswer?.value === option.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer?.value === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className="text-gray-700">{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={nextQuestion}
        disabled={!selectedAnswer}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
          selectedAnswer
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {currentQuestion === questions.length - 1 ? '結果を見る' : '次の質問'}
        <ChevronRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

// export default SelfAnalysisApp;
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <SelfAnalysisApp />
    </main>
  );
}