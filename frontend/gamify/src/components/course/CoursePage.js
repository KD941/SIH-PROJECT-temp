import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FlipCardGame from './games/FlipCardGame';
import FillInTheBlanks from './games/FillInTheBlanks';
import MemoryGame from './games/MemoryGame';

const demoCourse = {
  id: 'intro-js',
  title: 'Intro to JavaScript',
  steps: [
    { type: 'content', title: 'What is JavaScript?', body: 'JavaScript is a programming language used to make web pages interactive. It can update content, control multimedia, animate images, and much more.' },
    { type: 'content', title: 'Variables', body: 'Variables store values. Use let or const to declare variables in modern JS.' },
    { type: 'game', game: 'flipcard', title: 'Science Challenge' },
    { type: 'content', title: 'Functions', body: 'Functions are reusable blocks of code that perform specific tasks.' },
    { type: 'game', game: 'fillblanks', title: 'Fill in the Blanks' },
    { type: 'content', title: 'Arrays', body: 'Arrays store multiple values in a single variable.' },
    { type: 'game', game: 'memory', title: 'Memory Game' },
    { type: 'content', title: 'Congrats!', body: 'Great job! You have completed the JavaScript basics course.' }
  ]
};

const StepHeader = ({ index, total, title }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold text-white">{title}</h2>
    <span className="text-slate-400 text-sm">Step {index + 1} / {total}</span>
  </div>
);

const ContentCard = ({ title, body }) => (
  <div className="card">
    <StepHeader index={0} total={0} title={title} />
    <p className="text-slate-300 leading-7">{body}</p>
  </div>
);

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = useMemo(() => demoCourse, [courseId]);
  const [stepIndex, setStepIndex] = useState(0);

  const step = course.steps[stepIndex];
  const total = course.steps.length;

  const goNext = () => setStepIndex((i) => Math.min(i + 1, total - 1));
  const goPrev = () => setStepIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="min-h-screen bg-dark-900 bg-space-gradient text-slate-100 p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="btn btn-outline">← Back</button>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <div className="w-24" />
        </div>

        {/* Step content */}
        <div className="mb-6">
          {step.type === 'content' && (
            <div className="card">
              <StepHeader index={stepIndex} total={total} title={step.title} />
              <p className="text-slate-300 leading-7">{step.body}</p>
            </div>
          )}
          {step.type === 'game' && step.game === 'flipcard' && (
            <div className="card">
              <StepHeader index={stepIndex} total={total} title={step.title} />
              <FlipCardGame />
            </div>
          )}
          {step.type === 'game' && step.game === 'fillblanks' && (
            <div className="card">
              <StepHeader index={stepIndex} total={total} title={step.title} />
              <FillInTheBlanks />
            </div>
          )}
          {step.type === 'game' && step.game === 'memory' && (
            <div className="card">
              <StepHeader index={stepIndex} total={total} title={step.title} />
              <MemoryGame />
            </div>
          )}
        </div>

        {/* Pager */}
        <div className="flex items-center justify-between">
          <button onClick={goPrev} disabled={stepIndex === 0} className="btn btn-outline disabled:opacity-50">Previous</button>
          <button onClick={goNext} disabled={stepIndex === total - 1} className="btn btn-primary">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;