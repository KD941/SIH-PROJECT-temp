import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { addProgressToOutbox } from '../components/utils/offlineSync';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EquationMaster = () => {
    const [equation, setEquation] = useState('x*x');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [plotCount, setPlotCount] = useState(0);

    const plotGraph = () => {
        try {
            const labels = Array.from({ length: 21 }, (_, i) => i - 10);
            const data = labels.map(x => {
                // Note: Using eval is risky. In a real app, use a math expression parser library.
                return new Function('x', `return ${equation}`)(x);
            });

            setChartData({
                labels,
                datasets: [{
                    label: `y = ${equation}`,
                    data,
                    borderColor: '#22f3a2',
                    backgroundColor: 'rgba(34, 243, 162, 0.2)',
                    tension: 0.1,
                }]
            });

            // Save progress to the offline outbox
            const progress = {
                game: 'equation-master',
                equation: equation,
                plotted: true,
                points: 5 // Example: award 5 points per plot
            };
            addProgressToOutbox(progress);
            setPlotCount(prev => prev + 1);

        } catch (error) {
            alert('Invalid equation! Please use "x" as the variable.');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 bg-space-gradient text-white p-6 flex flex-col items-center">
            <div className="card w-full max-w-4xl text-center">
                <h1 className="text-3xl font-bold text-neon-green mb-2">Equation Master</h1>
                <p className="text-slate-400 mb-6">Enter an equation to plot it on the graph.</p>

                <div className="flex gap-2 justify-center mb-6">
                    <input
                        type="text"
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                        className="w-full max-w-md px-4 py-2 bg-dark-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green"
                        placeholder="e.g., x*x, Math.sin(x), 2*x + 3"
                    />
                    <button onClick={plotGraph} className="btn btn-primary shadow-glow">Plot</button>
                </div>

                <div className="bg-dark-800 p-4 rounded-lg">
                    {chartData.labels.length > 0 ? (
                        <Line data={chartData} />
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-500">Enter an equation and click "Plot" to see the graph.</div>
                    )}
                </div>
            </div>
            {plotCount > 0 && (
                <div className="mt-4 p-3 bg-green-500/20 text-neon-green rounded-lg shadow-glow">
                    Successfully plotted {plotCount} equation{plotCount > 1 ? 's' : ''}! Progress saved for offline sync.
                </div>
            )}
        </div>
    );
};

export default EquationMaster;