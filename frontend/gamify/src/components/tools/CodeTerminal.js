import React, { useState } from 'react';

const API_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
const API_HOST = 'judge0-ce.p.rapidapi.com';
const API_KEY = '94b26cc8b4mshe5f79946533ff4bp1f9486jsn188e1f94b14f'; // demo key from your snippet

const languageMap = {
  Python: 71,
  Java: 62,
  C: 50,
  'C++': 54
};

const CodeTerminal = () => {
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('Python');
  const [output, setOutput] = useState('Output will appear here...');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput('Running...');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': API_HOST,
          'X-RapidAPI-Key': API_KEY
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageMap[lang],
          stdin: '',
          cpu_time_limit: '2',
          memory_limit: '128000'
        })
      });
      const result = await res.json();
      if (result.stdout) setOutput(result.stdout);
      else if (result.compile_output) setOutput(result.compile_output);
      else if (result.message) setOutput(result.message);
      else setOutput('No output.');
    } catch (e) {
      console.error(e);
      setOutput('Error fetching result.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-space-gradient text-slate-100 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Code Terminal</h1>
          <div className="flex items-center gap-3">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-dark-800 border border-slate-600 text-slate-100 px-3 py-2 rounded"
            >
              {Object.keys(languageMap).map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <button onClick={runCode} disabled={loading} className="btn btn-primary shadow-glow disabled:opacity-60">
              {loading ? 'Running…' : 'Run Code'}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="card border border-slate-700">
            <h2 className="text-sm text-slate-400 mb-2">Editor</h2>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              className="w-full h-[360px] bg-dark-800 text-white border border-slate-700 rounded p-3 font-mono"
            />
          </div>
          <div className="card border border-slate-700">
            <h2 className="text-sm text-slate-400 mb-2">Output</h2>
            <div className="w-full h-[360px] bg-black text-green-300 rounded p-3 overflow-auto whitespace-pre-wrap">
              {output}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTerminal;