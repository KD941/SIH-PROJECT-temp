import React, { useState } from 'react';

const FormulaFounders = () => {
    const [equation, setEquation] = useState({
        reactants: [{ compound: 'H', count: 2 }, { compound: 'O', count: 2 }],
        products: [{ compound: 'H₂O', count: 1 }]
    });
    const [isBalanced, setIsBalanced] = useState(false);

    // A real implementation would have complex logic to check balancing
    const checkBalance = () => {
        // Placeholder logic
        const h_react = equation.reactants.find(r => r.compound === 'H').count * 2;
        const o_react = equation.reactants.find(r => r.compound === 'O').count * 2;
        const h_prod = equation.products.find(p => p.compound === 'H₂O').count * 2;
        const o_prod = equation.products.find(p => p.compound === 'H₂O').count * 1;

        if (h_react === h_prod && o_react === o_prod) {
            setIsBalanced(true);
            alert('Congratulations! The equation is balanced.');
        } else {
            setIsBalanced(false);
            alert('Not quite, try again!');
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 bg-space-gradient text-white p-6 flex flex-col items-center">
            <div className="card w-full max-w-4xl text-center">
                <h1 className="text-3xl font-bold text-neon-blue mb-2">Formula Founders</h1>
                <p className="text-slate-400 mb-6">Balance the chemical equation!</p>

                <div className="flex items-center justify-center text-2xl font-mono p-8 bg-dark-800 rounded-lg mb-6">
                    {/* This would be a dynamic component where users can change counts */}
                    <span className="text-neon-yellow">2</span> H₂ + <span className="text-neon-yellow">1</span> O₂
                    <span className="mx-4 text-slate-500">→</span>
                    <span className="text-neon-yellow">2</span> H₂O
                </div>

                <button onClick={checkBalance} className="btn btn-primary shadow-glow bg-gradient-to-r from-neon-blue to-purple-500">
                    Check My Answer
                </button>
            </div>
        </div>
    );
};

export default FormulaFounders;